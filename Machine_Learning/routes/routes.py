from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi import BackgroundTasks, FastAPI
from bson.objectid import ObjectId
from models.models import Candidate, CompanyID
from apiHandler.mlHandler import createBestModelAndEndpoint, callEndpoint
from models.models import Candidate, CompanyID

router = APIRouter()

@router.get("/")
def read_root():
    return {"data": "this is / get request for testing purposes"}

@router.post("/createModel/")
async def createModelAndEndpoint(companyID: CompanyID, request: Request, backgroundTasks: BackgroundTasks):
    # request.app.database['companies'].update_one({'_id': ObjectId(companyID.id)}, { '$set':{'mlJobCompletion': 'Starting ML Job', 'mlJobFailureMessage': ''}})
    # return {"message": " its reached the ML route"}
    backgroundTasks.add_task(createBestModelAndEndpoint,companyID.id,request)
    return {"Message":"Background task to create model and endpoint started"}

@router.post("/getQuote/")
async def getQuotation(companyID: CompanyID, request: Request):
    req = await request.json()
    quotation = callEndpoint(companyID.id, req['data'], request)
    print(quotation)
    return quotation