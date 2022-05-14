import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Overview from './company/Overview';
import CompanyJobApplications from './company/CompanyJobApplications';
import Dashboard from "./company/Dashboard";

class CompanyMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">Insurify</a>
          <a className="nav-link text-light" href="#/company/overview">Company Profile</a>
          <a className="nav-link text-light" href="#/company/dashboard">Dashboard</a>
          <a className="nav-link text-light" href="#/company/companyJobApplications">Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/company/overview" exact>
            <Overview />
          </Route>
          <Route path="/company/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/company/companyJobApplications" exact>
            <CompanyJobApplications />
          </Route>
        </div>
      </>
    );
  }
}

export default CompanyMain;
