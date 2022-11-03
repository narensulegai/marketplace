import React, { useEffect, useState } from 'react';
import { currentUser, updateCompany, uploadTargetColumnFile } from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const AddRules = () => {
  const [variables, setVariables] = useState([]);
  const [formula, setFormula] = useState(null);
  const [checked, setChecked] = useState(false);
  const [dataFile, setDataFile] = useState(null);
  const [dataFileLocation, setDataFileLocation] = useState(null);
  const [targetColumn, setTargetColumn] = useState(null);

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
    })();
  }, []);

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
    await updateCompany({ targetColumn: targetColumn });
    await uploadTargetColumnFile({ targetColumn: targetColumn, dataFileLocation: dataFileLocation });
    setTargetColumn(targetColumn);
  };

  const handleOnFileUpload = async ({ fileLocation, fileOrginalName }) => {
    await updateCompany({ dataFile: fileOrginalName, dataFileLocation: fileLocation});
    setDataFileLocation(fileLocation);
    setDataFile(fileOrginalName);
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <h4>Add rules</h4>
      </div>
      <div className='col-7'>
        <div className='inputLabel'>Excel formula</div>
        <div>
          <textarea
            cols={60}
            type='text'
            value={formula}
            onChange={handleOnFormulaChange}
            placeholder='IF(age>18, 100*num_of_cars, 1500)'
          />
        </div>
        <div className='mt-4'>
          <button className='btn-primary' onClick={handleOnSave}>
            Save
          </button>
        </div>{' '}
        &nbsp;
        <div className='inputLabel'>
          <h4>Machine learning based Rule Engine</h4>
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              checked={checked}
              onChange={handleOnChange}
            />
            &nbsp; Enable Rule Engine
          </label>
          {checked && (
            <div>
              <div className='inputLabel'>Add historical data</div>
              <div>
                {dataFile ? (
                  <div> {dataFile} </div>
                ) : (
                  <div className='inputLabel'>Upload csv file</div>
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
                <div className='inputLabel'>
                  Enter the column to be predicted:
                </div>
                <input
                  type='text'
                  value={targetColumn}
                  onChange={handleOnColumnChange}
                />
              </div>
              <div className='mt-4'>
                <button className='btn-primary' onClick={handleOnMLSave}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='col-5'>
        <div className='card'>
          <div className='card-header'>Available variables</div>
          <div className='card-body'>
            {variables.map((v, i) => {
              return (
                <div key={i}>
                  <div className='badge badge-pill badge-secondary'>{v}</div>
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
