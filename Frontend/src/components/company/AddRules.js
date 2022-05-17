import React, { createRef, useEffect, useState } from 'react';

const AddRules = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h4>Add rules</h4>
      </div>
      <div className="col-8">
        <div className="inputLabel">Excel formula</div>
        <div><input type="text" placeholder="IF(age>18, 100*num_of_cars, 1500)" /></div>
        <div className="inputLabel mt-4">Upload CSV to train ML rule engine</div>
        <div><input type="file" /></div>
        <div className="flex mt-4">
          <input type="checkbox" />
          <div className="ml-2">Enable ML rule engine</div>
        </div>
        <div className="mt-4">
          <button className="btn-primary">Save</button>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-header">Available variables</div>
          <div className="card-body">
            <div>
              <div className="badge badge-pill badge-secondary">age</div>
            </div>
            <div>
              <div className="badge badge-pill badge-secondary">num_of_cars</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

AddRules.propTypes = {};

export default AddRules;
