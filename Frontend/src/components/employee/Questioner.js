import React from 'react';

const Questioner = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h2>Questioner</h2>
        <div>What is your age?</div>
        <input type="number" placeholder="Age" className="mt-2" />
        <div className="mt-4">
          <input type="checkbox" placeholder="Age" />
          <span className="ml-3">Do you own a car?</span>
        </div>
        <div className="mt-4">
          <button className="btn-danger">Get quote</button>
        </div>
      </div>
    </div>
  );
};

Questioner.propTypes = {};

export default Questioner;
