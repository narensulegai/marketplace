import React, { useEffect, useRef, useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { currentUser, updateCompany } from '../../util/fetch/api';
import { reNameValues } from '../../util';

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
      setUrl(`${window.location.origin}/#/buyer/${current.user._id}`);
    })();
  }, []);

  const handleUpdate = (data) => {
    setForm(data.task_data);
  };
  const handleOnSave = async () => {
    reNameValues(form);
    await updateCompany({ formData: form });
  };
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleSubmitAnswers = (data) => {
    setVariables(data);
  };

  return (
    <div>
      <div>
        <button onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</button>
        &nbsp;&nbsp;<button onClick={handleOnSave}>Save</button>
      </div>
      <div className="mediumMarginTop d-flex">
        <a href={url}>{url}</a>
        &nbsp;&nbsp;
        <div onClick={() => { navigator.clipboard.writeText(url); }} className="pointer" role="button">
          Copy website URL
        </div>
      </div>
      {
        (form !== null && previewMode)
          ? (
            <ReactFormGenerator
              data={form}
              answer_data={variables}
              onSubmit={handleSubmitAnswers}
              submitButton={<button type="submit" className="btn btn-primary">Get Quote</button>}
            />
          )
          : (
            <>
              {loading ? (<div>Loading</div>)
                : (
                  <div ref={formBuilderRef}>
                    <ReactFormBuilder
                      data={form}
                      onPost={handleUpdate}
                      toolbarItems={items}
                  />
                  </div>
                )}
            </>
          )
        }
    </div>
  );
};

export default FormBuilder;
