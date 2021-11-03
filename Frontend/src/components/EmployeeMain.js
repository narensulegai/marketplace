import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileAndActivity from './employee/ProfileAndActivity';
import Demographics from './employee/Demographics';
import MyJobApplications from './employee/MyJobApplications';
import JobSearch from './employee/JobSearch';

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">Marketplace</a>
          <a className="nav-link text-light" href="#/employee/jobSearch">Search products</a>
          <a className="nav-link text-light" href="#/employee/myJobApplications">My orders</a>
          <a className="nav-link text-light" href="#/employee/profileAndActivity">My profile</a>
          <a className="nav-link text-light" href="#/employee/demographics">Address</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/employee/jobSearch" exact>
            <JobSearch />
          </Route>
          <Route path="/employee/myJobApplications" exact>
            <MyJobApplications />
          </Route>
          <Route path="/employee/profileAndActivity" exact>
            <ProfileAndActivity />
          </Route>
          <Route path="/employee/demographics" exact>
            <Demographics />
          </Route>
        </div>
      </>
    );
  }
}

export default EmployeeMain;
