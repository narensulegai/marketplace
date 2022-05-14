import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Questioner from './employee/Questioner';

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/buyer/questioner">Insurify</a>
          <a className="nav-link text-light" href="#/buyer/questioner">Questioner</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/buyer/questioner" exact>
            <Questioner />
          </Route>
        </div>
      </>
    );
  }
}

export default EmployeeMain;
