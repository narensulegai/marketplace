import React, { useEffect, useState } from 'react';
import { currentUser, updateCompany, uploadTargetColumnFile, getCompany } from '../../util/fetch/api';
import { createModel } from '../../util/mlFetch/mlApi';
import FileUpload from '../common/FileUpload';
import ProgressBar from '../common/ProgressBar';

const AddRules = () => {
  const [variables, setVariables] = useState([]);
  const [formula, setFormula] = useState('');
  const [checked, setChecked] = useState(false);
  const [dataFile, setDataFile] = useState(null);
  const [dataFileLocation, setDataFileLocation] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);
  const [companyID, setcompanyID] = useState(null);
  const [mlJobCompletion, setMlJobCompletion] = useState(null);
  const [mlJobFailureMessage, setMlJobFailureMessage] = useState(null);
  const [completed, setCompleted] = useState(0);

  const completionStatus = new Map
    ([["Not Started" , 0],
    ["Starting ML Job" , 2],
    ["Analyzing Data", 5],
    ["Feature Engineering", 20],
    ["Model Tuning", 40], 
    ["ML Job Completed", 50],
    ["Created and deployed best model", 70],
    ["Creating Endpoint", 80],
    ["Completed", 100]]);

  useEffect(() => {
    (async () => {
      const current = await currentUser();
      const form = current.user.formData;
      setFormula(current.user.ruleFormula);
      setVariables(form.map((f) => f.field_name));
      setChecked(current.user.mlRuleEngine);
      setDataFile(current.user.dataFile);
      setDataFileLocation(current.user.dataFileLocation);
      setTargetColumn(current.user.targetColumn);
      setcompanyID(current.user._id)
      setMlJobCompletion(current.user.mlJobCompletion)
      setMlJobFailureMessage(current.user.mlJobFailureMessage)
      setCompleted(completionStatus.get(current.user.mlJobCompletion))
      setInterval(async () => {
        const company = await getCompany(current.user._id);
        setMlJobCompletion(company.mlJobCompletion)
        setCompleted(completionStatus.get(company.mlJobCompletion))}, 60000);
    })();
  }, []);
  //120000 = 2 min , 60000 = 1 min

  const acceptType = 'text/csv';

  const handleOnSave = async () => {
    await updateCompany({ ruleFormula: formula });
  };
  const handleOnFormulaChange = (e) => {
    setFormula(e.target.value);
  };
  const handleOnChange = async () => {
    await updateCompany({ mlRuleEngine: !checked });
    setChecked(!checked);
  };

  const handleOnColumnChange = (e) => {
    setTargetColumn(e.target.value);
  };

  const handleOnMLSave = async () => {
    await updateCompany({ targetColumn });
    await uploadTargetColumnFile({ targetColumn, dataFileLocation });
    setTargetColumn(targetColumn);
  };

  const handleOnMLStart = async () => {
    const result = await createModel({id: companyID});
    const company = await getCompany(companyID)
    setMlJobCompletion(company.mlJobCompletion)
    setCompleted(completionStatus.get(company.mlJobCompletion))
    console.log(result)
  }

  const handleOnFileUpload = async ({ fileLocation, fileOrginalName }) => {
    await updateCompany({ dataFile: fileOrginalName, dataFileLocation: fileLocation });
    setDataFileLocation(fileLocation);
    setDataFile(fileOrginalName);
  };

  return (
    <div className="row">
      <div className="col-12">
        <h4>Add rules</h4>
      </div>
      <div className="col-7">
        <div className="inputLabel">Excel formula</div>
        <div>
          <textarea
            cols={60}
            type="text"
            value={formula}
            onChange={handleOnFormulaChange}
            placeholder="IF(age>18, 100*num_of_cars, 1500)"
          />
        </div>
        <div className="mt-4">
          <button className="btn-primary" onClick={handleOnSave}>
            Save
          </button>
        </div>{' '}
        &nbsp;
        <div className="inputLabel">
          <h4>Machine learning based Rule Engine</h4>
        </div>
        <div>
          <label htmlFor="enable-rule-engine">
            <input
              name="enable-rule-engine"
              type="checkbox"
              checked={checked}
              onChange={handleOnChange}
            />
            &nbsp; Enable Rule Engine
          </label>
          {checked && (
            <div>
              <div className="inputLabel">Add historical data</div>
              <div>
                {dataFile ? (
                  <div> {dataFile} </div>
                ) : (
                  <div className="inputLabel">Upload csv file</div>
                )}
                &nbsp;
              </div>
              <div>
                <FileUpload
                  singleFile
                  accept={acceptType}
                  onUpload={handleOnFileUpload}
                />
              </div>
              <div>
                &nbsp;
                <div className="inputLabel">
                  Enter the column to be predicted:
                </div>
                <input
                  type="text"
                  value={targetColumn}
                  onChange={handleOnColumnChange}
                />
              </div>
              <div className="mt-4">
                <button className="btn-primary" onClick={handleOnMLSave}>
                  Save
                </button>
              </div>
              <div className='mt-4'>
                <button className='btn-primary' 
                disabled={(mlJobCompletion != 'Not Started' ) && (mlJobCompletion != 'Failed')} 
                onClick={handleOnMLStart}>
                  Start ML training
                </button>
                <div>
                  <ProgressBar completed={completed} />
                </div>
                Job Status: {mlJobCompletion === 'Failed' ? mlJobCompletion + ":  " + mlJobFailureMessage : mlJobCompletion }
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-5">
        <div className="card">
          <div className="card-header">Available variables</div>
          <div className="card-body">
            {variables.map((v, i) => {
              return (
                <div key={i}>
                  <div className="badge badge-pill badge-secondary">{v}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
AddRules.propTypes = {};
export default AddRules;
