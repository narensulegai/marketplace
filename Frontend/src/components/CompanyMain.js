import React, { useState } from "react";
import { Route } from "react-router-dom";
import Overview from "./company/Overview";
import Dashboard from "./company/Dashboard";
// import BuildWebsite from './company/BuildWebsite';
import AddRules from './company/AddRules';
import FormBuilder from './company/FormBuilder';
import Analytics from './company/Analytics/Analytics';
import Reports  from './company/Reports/Reports';
import SalesOverTime from './company/Reports/SalesOverTime';
import SalesByPolicy from './company/Reports/SalesByPolicy';
import SalesByML from './company/Reports/SalesByML';
import SalesByFormula from './company/Reports/SalesByFormula';
import CustomersOverTime from './company/Reports/CustomersOverTime';
import OneTimeCustomers from './company/Reports/OneTimeCustomers';
import LoyalCustomers from './company/Reports/LoyalCustomers';
import ReturningCustomers from './company/Reports/ReturningCustomers';
import InsurancePolicyOverTime from './company/Reports/InsurancePolicyOverTime';
import PolicyMetrics from './company/Reports/PolicyMetrics';
import StoreAnalysis from './company/Reports/StoreAnalysis';
import TopStoreSearches from './company/Reports/TopStoreSearches';
import AddRules from "./company/AddRules";
import FormBuilder from "./company/FormBuilder";
import ChatPanel from "./chat/ChatPanel";
import { useParams } from "react-router-dom";
import Draggable from "react-draggable";
import Minimize from "@mui/icons-material/ChatBubble";
import Maximize from "@mui/icons-material/ChatBubble";
import { IconButton } from "@mui/material";
import config from "./chatbot/config.js";
//import getConfig from ".././chatbot/getConfig.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./chatbot/MessageParser.js";
import ActionProvider from "./chatbot/ActionProvider.js";

const CompanyMain = () => {
  const { id: companyId } = useParams();
  const { id: userId } = useParams();
  const [minimizeBot, setMinimizeBot] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">

        <a className="navbar-brand text-light" href="#/">Insurify</a>
        <a className="nav-link text-light" href="#/company/overview">Company Profile</a>
        <a className="nav-link text-light" href="#/company/dashboard">Dashboard</a>
        <a className="nav-link text-light" href="#/company/formBuilder">Build website</a>
        <a className="nav-link text-light" href="#/company/addRules">Add Rules</a>
        <a className="nav-link text-light" href="#/company/analytics">Analytics</a>
        <a className="nav-link text-light" href="#/company/reports">Reports</a>
        <a className="nav-link" href="#/logout">Logout</a>
        
        <a className="navbar-brand text-light" href="#/">
          Insurify
        </a>
        <a className="nav-link text-light" href="#/company/overview">
          Company Profile
        </a>
        <a className="nav-link text-light" href="#/company/dashboard">
          Dashboard
        </a>
        <a className="nav-link text-light" href="#/company/formBuilder">
          Build website
        </a>
        <a className="nav-link text-light" href="#/company/addRules">
          Add Rules
        </a>
        <a
          className="nav-link text-light"
          href={`#/company/${userId}/${companyId}/chat`}
        >
          Chat
        </a>
        <a className="nav-link" href="#/logout">
          Logout
        </a>
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
        <Route path="/company/analytics" exact>
          <Analytics />
        </Route>
        <Route path="/company/reports" exact>
          <Reports />
        </Route>
        <Route path="/company/salesovertime" exact>
          <SalesOverTime />
        </Route>
        <Route path="/company/salesbypolicy" exact>
          <SalesByPolicy />
        </Route>
        <Route path="/company/salesbyML" exact>
          <SalesByML />
        </Route>
        <Route path="/company/salesbyformula" exact>
          <SalesByFormula />
        </Route>
        <Route path="/company/customersovertime" exact>
          <CustomersOverTime />
        </Route>
        <Route path="/company/onetimecustomers" exact>
          <OneTimeCustomers />
        </Route>
        <Route path="/company/loyalcustomers" exact>
          <LoyalCustomers />
        </Route>
        <Route path="/company/returningcustomers" exact>
          <ReturningCustomers />
        </Route>
        <Route path="/company/ordersovertime" exact>
          <InsurancePolicyOverTime />
        </Route>
        <Route path="/company/policymetrics" exact>
          <PolicyMetrics />
        </Route>
        <Route path="/company/topstoresearches" exact>
          <TopStoreSearches />
        </Route>
        <Route path="/company/storeanalysis" exact>
          <StoreAnalysis />
        <Route path="/company/:userId/:currentId/chat" exact>
          <ChatPanel />
        </Route>
      </div>
    </>
  );
};

export default CompanyMain;
