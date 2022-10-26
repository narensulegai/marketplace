import React, { useEffect, useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { currentUser, updateCompany } from '../../util/fetch/api';

const items = [
  { key: 'Header' },
  { key: 'TextInput' },
  { key: 'TextArea' },
  { key: 'RadioButtons' },
  { key: 'Checkboxes' },
];

const FormBuilder = () => {
  const [form, setForm] = useState(null);
  const [variables, setVariables] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const current = await currentUser();
      setForm(JSON.parse(current.user.formData));
      setLoading(false);
    })();
  }, []);

  const handleUpdate = (data) => {
    setForm(data.task_data);
  };
  const handleOnSave = async () => {
    await updateCompany({ formData: JSON.stringify(form) });
  };
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleSubmitAnswers = (data) => {
    setVariables(data);
  };
  return (
    <div>
      <button onClick={togglePreviewMode}>{previewMode ? 'Edit' : 'Preview'}</button>
      &nbsp;&nbsp;<button onClick={handleOnSave}>Save</button>
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
                  <ReactFormBuilder
                    data={form}
                    onPost={handleUpdate}
                    toolbarItems={items}
                  />
                )}
            </>
          )
        }
    </div>
  );
};

FormBuilder.propTypes = {

};

export default FormBuilder;
