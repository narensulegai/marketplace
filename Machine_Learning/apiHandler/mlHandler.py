# Import required libraries
from array import array
from time import gmtime, sleep, strftime
from urllib import request
import sagemaker
import boto3
import pandas as pd
import os
import json
from bson.objectid import ObjectId
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, Body, Request, Response, HTTPException, status

def createBestModelAndEndpoint(companyID: str, request: Request):
    bestModel = createModel(companyID, request)

    endPointName = createEndpoint(model_name=bestModel.get('modelName'), 
                    sm=bestModel.get('sm'), companyName=bestModel.get('companyName'), companyId=companyID,
                     request=request)
    
def createModel(companyID: str, request: Request):
    # Define region, bucket
    session = sagemaker.Session()
    region = boto3.Session().region_name
    bucket = session.default_bucket()

    # Select an IAM role
    role = 'arn:aws:iam::800859449169:role/AWSSageMakerFullAccess' 

    # Define sm object to be used to call Sagemaker services 
    sm = boto3.Session().client(service_name='sagemaker',region_name=region)

    if (companyDetails := request.app.database['companies'].find_one({'_id': ObjectId(companyID)}, {'_id': 0})) is not None:
        if (companyDetails.get('mlRuleEngine') is False):
            request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':
                {'mlJobCompletion': 'Failed', 'mlJobFailureMessage': "ML Rule engine is not enabled"}})
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"ML Rule engine is not enabled")
        target_column = companyDetails.get('targetColumn')
        if (not (target_column and not target_column.isspace())):
            request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':
                {'mlJobCompletion': 'Failed', 'mlJobFailureMessage': "Please update target column"}})
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Please update target column")
        dataFileLocation = companyDetails.get('dataFileLocation')
        if (not (dataFileLocation and not dataFileLocation.isspace())):
            request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':
                {'mlJobCompletion': 'Failed', 'mlJobFailureMessage': "data filelocation is empty, please upload csv file"}})
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"data filelocation is empty")
        data = pd.read_csv(dataFileLocation)
        # print(data.head())

        request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Starting ML Job', 'mlJobFailureMessage': ''}})
        
        # Dividing the data into training and testing splits
        train_data = data.sample(frac=0.8,random_state=200)
        test_data = data.drop(train_data.index)
        test_data_no_target = test_data.drop(columns=[target_column])

        companyName = companyDetails.get('name').replace(' ', '')
        #Uploading the dataset to Amazon S3
        # Define the S3 bucket and prefix(subfolder within the bucket)
        prefix = companyName + '/data'

        train_file = 'train_data.csv'
        train_data.to_csv(train_file, index=False, header=True)
        train_data_s3_path = session.upload_data(path=train_file, key_prefix=prefix + "/train")

        print('Train data uploaded to →'  + train_data_s3_path)

        test_file = 'test_data.csv'
        test_data_no_target.to_csv(test_file, index=False, header=False)
        test_data_s3_path = session.upload_data(path=test_file, key_prefix=prefix + "/test")

        print('Test data uploaded to →'  + test_data_s3_path)


        # Define max number of candidates
        max_candidates = 3

        job_config = {
            'CompletionCriteria': {
            'MaxRuntimePerTrainingJobInSeconds': 300,
            'MaxCandidates': max_candidates,
            },
        }

        input_data_config = [{
            'DataSource': {
                'S3DataSource': {
                'S3DataType': 'S3Prefix',
                'S3Uri': 's3://{}/{}/train'.format(bucket,prefix)
                }
            },
            'TargetAttributeName': target_column
            }
        ]

        output_data_config = {
            'S3OutputPath': 's3://{}/{}/output'.format(bucket,prefix)
        }

        tags_config = [ { 
                "Key": "Project",
                "Value": "Project_Policy"
                }
        ]

        timestamp_suffix = strftime('%Y-%m-%d-%H-%M-%S', gmtime())
        model_prefix  = companyName[:2] + '-automl'

        auto_ml_job_name =  model_prefix + '-' + timestamp_suffix

        print('AutoMLJobName → '  + auto_ml_job_name)

        sm.create_auto_ml_job(AutoMLJobName=auto_ml_job_name,
                            InputDataConfig=input_data_config,
                            OutputDataConfig=output_data_config,
                            AutoMLJobConfig=job_config,
                            RoleArn=role,
                            Tags=tags_config)

        job_status = sm.describe_auto_ml_job(AutoMLJobName=auto_ml_job_name)
        print (job_status['AutoMLJobStatus'] + " - " + job_status['AutoMLJobSecondaryStatus'])
        job_run_status = job_status['AutoMLJobStatus']

        while job_run_status not in ('Failed', 'Completed', 'Stopped'):
            job_status = sm.describe_auto_ml_job(AutoMLJobName=auto_ml_job_name)
            job_run_status = job_status['AutoMLJobStatus']
            print (job_status['AutoMLJobStatus'] + " - " + job_status['AutoMLJobSecondaryStatus'])

            if job_status['AutoMLJobSecondaryStatus'] == 'AnalyzingData':
                request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Analyzing Data', 'mlJobFailureMessage': ''}})
            elif job_status['AutoMLJobSecondaryStatus'] == 'FeatureEngineering':
                request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Feature Engineering', 'mlJobFailureMessage': ''}})
            elif job_status['AutoMLJobSecondaryStatus'] == 'ModelTuning':
                request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Model Tuning', 'mlJobFailureMessage': ''}})
            
            if job_status['AutoMLJobStatus'] == "Failed":
                message = sm.describe_auto_ml_job(AutoMLJobName=auto_ml_job_name)["FailureReason"]
                print("Training {} failed with the following error: {}".format(auto_ml_job_name, message))
                request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':
                {'mlJobCompletion': 'Failed', 'mlJobFailureMessage': "Training {} failed with the following error: {}".format(auto_ml_job_name, message)}})
                raise HTTPException(status_code = 500, detail= "Training {} failed with the following error: {}".format(auto_ml_job_name, message))
            
            sleep(30)
        
        request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'ML Job Completed', 'mlJobFailureMessage': ''}})
        best_candidate = sm.describe_auto_ml_job(AutoMLJobName=auto_ml_job_name)['BestCandidate']

        # extract the InferenceContainers definition from the caandidate definition
        inference_containers = best_candidate['InferenceContainers']

        model_name = companyName + 'best-model'
        create_model_response = sm.create_model(
        ModelName = model_name,
        ExecutionRoleArn = role,
        Containers = inference_containers 
        )

        request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Created and deployed best model', 'mlJobFailureMessage': ''}})
        

        if(os.path.exists(train_file) and os.path.isfile(train_file)):
            os.remove(train_file)
            print("local train_file deleted")
        print("train_file not found")

        if(os.path.exists(test_file) and os.path.isfile(test_file)):
            os.remove(test_file)
            print("local test_file deleted")
        print("test_file not found")

        return {'sm': sm, 'companyName': companyName, 'modelName': model_name}

    request.app.database['companies'].update_one({'_id': ObjectId(companyID)}, { '$set':{'mlJobCompletion': 'Failed', 'mlJobFailureMessage': f"Company with ID {companyID} not found"}})
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {companyID} not found")

def createEndpoint(model_name, sm, companyName, companyId, request):
    
    endpoint_config_name = companyName + '-endpoint-config'
                                                                
    instance_type = 'ml.m5.xlarge' 
    
    endpoint_config_response = sm.create_endpoint_config(
    EndpointConfigName=endpoint_config_name, 
    ProductionVariants=[
        {
            "VariantName": "variant1",
            "ModelName": model_name, 
            "InstanceType": instance_type,
            "InitialInstanceCount": 1
        }
    ]
    )

    print(f"Created EndpointConfig: {endpoint_config_response['EndpointConfigArn']}")  
        
        # create endpoint and deploy the model
    endpoint_name = companyName + '-endpoint'
    create_endpoint_response = sm.create_endpoint(
                                                EndpointName=endpoint_name, 
                                                EndpointConfigName=endpoint_config_name)
    print(create_endpoint_response["EndpointArn"])

    resp = sm.describe_endpoint(EndpointName=endpoint_name)
    status = resp["EndpointStatus"]
    print("Status: " + status)
    request.app.database['companies'].update_one({'_id': ObjectId(companyId)}, { '$set':{'mlJobCompletion': 'Creating Endpoint', 'mlJobFailureMessage': ''}})

    try:
        sm.get_waiter("endpoint_in_service").wait(EndpointName=endpoint_name)
    finally:
        resp = sm.describe_endpoint(EndpointName=endpoint_name)
        status = resp["EndpointStatus"]
        print("Arn: " + resp["EndpointArn"])
        print("Create endpoint ended with status: " + status)

        if status == "InService":
            request.app.database['companies'].update_one({'_id': ObjectId(companyId)}, { '$set':{'endPoint': endpoint_name, 'mlJobCompletion': 'Completed', 'mlJobFailureMessage': ''}})
            return (endpoint_name)

        if status == "Failed":
            message = sm.describe_endpoint(EndpointName=endpoint_name)["FailureReason"]
            print("Training failed with the following error: {}".format(message))
            request.app.database['companies'].update_one({'_id': ObjectId(companyId)}, { '$set':{'mlJobCompletion': 'Failed', 'mlJobFailureMessage': 'Endpoint creation did not succeed'}})
            raise HTTPException(status_code=500, detail=f"Endpoint creation did not succeed")

def callEndpoint(companyID: str, req: array, request: Request):
    sm_runtime = boto3.Session().client('sagemaker-runtime')
    if (companyDetails := request.app.database['companies'].find_one({'_id': ObjectId(companyID)}, {'_id': 0})) is not None:
        if (companyDetails.get('mlJobCompletion') == 'Completed'):
            endpointName = companyDetails.get('endPoint')
            # data = list(req.values())
            # data.pop(0)
            data = ','.join(str(x) for x in req)
            inference_result = sm_runtime.invoke_endpoint(EndpointName=endpointName, ContentType='text/csv', Body=data)
            quote = inference_result["Body"].read().decode()
            result = {'Quotation': float(quote)}
            return result
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Endpoint not created yet, please try again later!")

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Company with ID {companyID} not found")


# if __name__ == "__main__":
#     args_all = args()