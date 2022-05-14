import React, { createRef, useEffect, useState } from 'react';

const widgetsLib = {
  inputBox: <input type="text" className="mb-3" />,
  text: <div contentEditable className="textEditable mb-3" />,
  checkbox: <div className="mb-3 flex">
    <input type="checkbox" className="mr-2" />
    <div contentEditable className="textEditable flex-grow-1" />
  </div>,
};
const BuildWebsite = () => {
  const [widgets, setWidgets] = useState([]);
  const handleOnInputBox = () => {
    const newWidgets = [...widgets];
    newWidgets.push('inputBox');
    setWidgets(newWidgets);
  };
  const handleOnText = () => {
    const newWidgets = [...widgets];
    newWidgets.push('text');
    setWidgets(newWidgets);
  };
  const handleOnCheckbox = () => {
    const newWidgets = [...widgets];
    newWidgets.push('checkbox');
    setWidgets(newWidgets);
  };
  return (
    <div className="row">
      <div className="col-12">
        <h4>Build website</h4>
      </div>
      <div className="col-8">
        {widgets.length === 0 && <h6>Add some widgets here</h6>}
        {widgets.map((w, i) => {
          return <div key={i}>{widgetsLib[w]}</div>;
        })}
        {widgets.length > 0 && (
        <div className="flex">
          <button className="btn-primary">Save</button>
          <button className="btn-primary ml-3">Preview</button>
        </div>
        )}
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-header">Select a widget</div>
          <div className="card-body">
            <div onClick={handleOnInputBox}>Input box</div>
            <div onClick={handleOnText}>Text</div>
            <div onClick={handleOnCheckbox}>Checkbox</div>
          </div>
        </div>
      </div>
    </div>
  );
};

BuildWebsite.propTypes = {};

export default BuildWebsite;
