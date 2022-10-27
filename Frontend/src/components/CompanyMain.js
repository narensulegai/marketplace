import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './company/Overview';
import Dashboard from './company/Dashboard';
// import BuildWebsite from './company/BuildWebsite';
import AddRules from './company/AddRules';
import FormBuilder from './company/FormBuilder';

const CompanyMain = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <a className="navbar-brand text-light" href="#/">Insurify</a>
        <a className="nav-link text-light" href="#/company/overview">Company Profile</a>
        <a className="nav-link text-light" href="#/company/dashboard">Dashboard</a>
        <a className="nav-link text-light" href="#/company/formBuilder">Build website</a>
        <a className="nav-link text-light" href="#/company/addRules">Add Rules</a>
        <a className="nav-link" href="#/logout">Logout</a>
      </nav>
      <div className="container mt-3">
        <Route path="/company/overview" exact>
          <Overview />
        </Route>
        <Route path="/company/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/company/formBuilder" exact>
          <FormBuilder />
          {/* <BuildWebsite /> */}
        </Route>
        <Route path="/company/addRules" exact>
          <AddRules />
        </Route>
      </div>
    </>
  );
};

export default CompanyMain;
