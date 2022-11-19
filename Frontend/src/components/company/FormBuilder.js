import React, { useEffect, useRef, useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { currentUser, updateCompany } from '../../util/fetch/api';
import { reNameValues } from '../../util';
import VariableName from './VariableName';

const items = [
  { key: 'Header' },
  { key: 'TextInput' },
  { key: 'TextArea' },
  { key: 'RadioButtons' },
  { key: 'Checkboxes' },
];

const FormBuilder = () => {
  const [form, setForm] = useState([]);
  const [variables, setVariables] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const formBuilderRef = useRef();

  useEffect(() => {
    (async () => {
      const current = await currentUser();
      setForm(current.user.formData);
      setLoading(false);
      // http://localhost:3000/#/buyer/6358c9d2dfb3a3e1d4ddceba/questioner
      setUrl(`${window.location.origin}/?${current.user.name}#/buyer/${current.user._id}`);
    })();
  }, []);

  const handleUpdate = (data) => {
    // console.log(data.task_data)
    setForm(data.task_data);
  };
  const handleOnSave = async () => {
    reNameValues(form, (value) => value.replaceAll('-', '_'));
    await updateCompany({ formData: form });
  };
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleSubmitAnswers = (data) => {
    setVariables(data);
  };
  const handleOnVariableChange = (oldVariable, newVariable) => {
    reNameValues([...form], (value) => {
      if (value === oldVariable) {
        return newVariable;
      }
      return value;
    });
    setForm([...form]);
  };

  return (
    <div className="row">
      <div className="col-2">
        <button onClick={handleOnSave}>Save</button>
        <button onClick={togglePreviewMode} className="ml-2">{previewMode ? 'Edit' : 'Preview'}</button>
      </div>
      <div className="col-10 text-right">
        <a href={url}>{url}</a>
        <button onClick={() => { navigator.clipboard.writeText(url); }} className="badge badge-pill ml-3">
          Copy website URL
        </button>
      </div>
      <>
        {
        (form !== null && previewMode)
          ? (
            <>
              <div className="col-7">
                <ReactFormGenerator
                  data={form}
                  answer_data={variables}
                  onSubmit={handleSubmitAnswers}
                  submitButton={<button type="submit" className="btn btn-primary">Get Quote</button>}
                />
              </div>
              <div className="rename-variables col-5 mt-3">
                <div className="card">
                  <div className="card-header">Rename variables</div>
                  <div className="card-body">
                    {form.map((v) => {
                      return (
                        <VariableName
                          key={v.id}
                          variable={v}
                          onChange={handleOnVariableChange} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )
          : (
            <>
              {loading ? (<div className="col-12">Loading</div>)
                : (
                  <div ref={formBuilderRef} className="col-12 mt-3">
                    <ReactFormBuilder
                      data={form}
                      onPost={handleUpdate} />
                  </div>
                )}
            </>
          )
        }
      </>
    </div>
  );
};

export default FormBuilder;
