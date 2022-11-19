import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { currentUser, getCompanyQuotes } from "../util/fetch/api";
import Questioner from "./employee/Questioner";
import Chat from "./chat/ChatPanel";
import ChatPanel from "./chat/ChatPanel";
import AddRules from "./company/AddRules";
import FormBuilder from "./company/FormBuilder";
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

const EmployeeMain = () => {
  const { id: companyId } = useParams();
  const { id: userId } = useParams();
  const [current, setCurrent] = useState({});
  const [minimizeBot, setMinimizeBot] = useState(false);
  useEffect(() => {
    (async () => {
      const { user } = await currentUser();
      setCurrent(user);
    })();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a
          className="navbar-brand text-light"
          href={`#/buyer/${companyId}/questioner`}
        >
          Insurify
        </a>
        <a
          className="nav-link text-light"
          href={`#/buyer/${companyId}/questioner`}
        >
          Questioner
        </a>
        <a
          className="nav-link text-light"
          href={`#/buyer/${companyId}/${current._id}/chat`}
        >
          Chat
        </a>
        <a className="nav-link ml-auto" href="#/logout">
          Logout
        </a>
      </nav>

      <div className="container mt-3">
        <div className="row">
          <div className="col-9">
            <Route path="/buyer/:id/:questioner" exact>
              <Questioner />
            </Route>
            <Route path="/buyer/:userId/:currentId/chat" exact>
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
    </>
  );
};

export default EmployeeMain;
