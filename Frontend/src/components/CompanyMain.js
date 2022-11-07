import React, { useState } from "react";
import { Route } from "react-router-dom";
import Overview from "./company/Overview";
import Dashboard from "./company/Dashboard";
// import BuildWebsite from './company/BuildWebsite';
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
  const [minimizeBot, setMinimizeBot] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
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
        <a className="nav-link text-light" href={`#/company/${companyId}/chat`}>
          Chat
        </a>
        <a className="nav-link" href="#/logout">
          Logout
        </a>
      </nav>
      <div className="container mt-3">
        <div className="container">
          <div className="row">
            <div className="col-9">
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
              <Route path={`/company/${companyId}/chat`} exact>
                <ChatPanel />
              </Route>
            </div>
            <div className="col-3">
              <div className="mt-3">
                {minimizeBot ? (
                  <Draggable>
                    <div className="appChatbotContainer_3u5t">
                      <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                      />
                      <IconButton
                        style={{ height: "50px" }}
                        onClick={() => setMinimizeBot(!minimizeBot)}
                        className="btn-overlay"
                      >
                        <Minimize />
                      </IconButton>
                    </div>
                  </Draggable>
                ) : (
                  <Draggable>
                    <div className="appChatbotContainer_3u5t">
                      <div className="react-chatbot-kit-chat-container">
                        <div className="react-chatbot-kit-chat-header">
                          <IconButton
                            onClick={() => setMinimizeBot(!minimizeBot)}
                          >
                            <Maximize />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </Draggable>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyMain;
