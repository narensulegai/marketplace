import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VariableName = ({ variable, onChange }) => {
  let name = '';
  const [newValue, setNewValue] = useState('');
  if (variable.element === 'TextInput' || variable.element === 'TextArea') {
    name = variable.field_name;
  }

  if (variable.element === 'Checkboxes' || variable.element === 'RadioButtons') {
    name = variable.field_name;
  }

  if (variable.element === 'Options') {
    name = variable.key;
  }

  const handleOnNameChange = (e) => {
    setNewValue(e.target.value.replace(/[^0-9a-z_]/gi, ''));
  };

  const handleOnRename = () => {
    if (!newValue) {
      alert('Name cant be empty');
    } else {
      onChange(name, newValue);
    }
  };

  const handleOnOptionChange = (oldValue, newValue) => {
    onChange(oldValue, newValue);
  };
  return (
    <>
      <div className="mt-2 badge badge-pill badge-warning">
        {variable.label || variable.text}
      </div>
      <div className="badge badge-pill badge-info ml-2">
        {name}
      </div>
      <div>
        <input type="text"
          placeholder="Rename to"
          className="smallInput"
          value={newValue}
          onChange={handleOnNameChange} />
        &nbsp;&nbsp;<button onClick={handleOnRename}>Rename</button>
      </div>
      {['RadioButtons', 'Checkboxes'].includes(variable.element)
        ? variable.options.map((option) => {
          return (
            <div className="mediumMarginLeft">
              <VariableName
                key={option.key}
                variable={{ ...option, element: 'Options' }}
                onChange={handleOnOptionChange} />
            </div>
          );
        })
        : null}
    </>

  );
};
VariableName.propTypes = {
  variable: PropTypes.any,
  onChange: PropTypes.func,
};
export default VariableName;