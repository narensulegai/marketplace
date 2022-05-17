import React, { createRef, useEffect, useState } from 'react';

const widgetsLib = {
  inputBox: <input type="text" />,
  text: <div contentEditable className="textEditable" />,
  checkbox: <div className="flex">
    <input type="checkbox" className="mr-2" />
    <div contentEditable className="textEditable flex-grow-1" />
  </div>,
};
const BuildWebsite = () => {
  const [widgets, setWidgets] = useState([]);
  const [isPreview, setPreview] = useState(false);
  const handleOnInputBox = () => {
    const name = prompt('Name of the widget');
    if (name) {
      const newWidgets = [...widgets];
      newWidgets.push({ widget: 'inputBox', name });
      setWidgets(newWidgets);
    }
  };
  const handleOnText = () => {
    const newWidgets = [...widgets];
    newWidgets.push({ widget: 'text', name: '' });
    setWidgets(newWidgets);
  };
  const handleOnCheckbox = () => {
    const name = prompt('Name of the widget');
    if (name) {
      const newWidgets = [...widgets];
      newWidgets.push({ widget: 'checkbox', name });
      setWidgets(newWidgets);
    }
  };
  const handleOnPreview = () => {
    setPreview(!isPreview);
  };
  return (
    <div className="row">
      <div className="col-12">
        <h4>Build website</h4>
      </div>
      <div className={isPreview ? 'col-8  preview' : 'col-8'}>
        {widgets.length === 0 && <h6>Add some widgets here</h6>}
        {widgets.map((w, i) => {
          return (
            <div key={i} className="mb-3">
              <div>{widgetsLib[w.widget]}</div>
              {w.name && <div className="widgetName small">{w.name}</div>}
            </div>
          );
        })}
        {widgets.length > 0 && (
        <div className="flex">
          <button className="btn-primary">Save</button>
          <button className="btn-primary ml-3" onClick={handleOnPreview}>
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        )}
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-header">Select a widget</div>
          <div className="card-body">
            <div onClick={handleOnInputBox} className="pointer">Input box</div>
            <div onClick={handleOnText} className="pointer">Text</div>
            <div onClick={handleOnCheckbox} className="pointer">Checkbox</div>
          </div>
        </div>
      </div>
    </div>
  );
};

BuildWebsite.propTypes = {};

export default BuildWebsite;
