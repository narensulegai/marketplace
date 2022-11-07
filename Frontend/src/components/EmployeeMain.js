import React from "react";
import { Route, useParams } from "react-router-dom";
import Questioner from "./employee/Questioner";
import Chat from "./chat/ChatPanel";
import ChatPanel from "./chat/ChatPanel";

const EmployeeMain = () => {
  const { id: companyId } = useParams();
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
        <a className="nav-link text-light" href={`#/buyer/${companyId}/chat`}>
          Chat
        </a>
        <a className="nav-link" href="#/logout">
          Logout
        </a>
      </nav>
      <div className="container mt-3">
        <Route path="/buyer/:id/questioner" exact>
          <Questioner />
        </Route>
        <Route path="/buyer/:id/chat" exact>
          <ChatPanel />
        </Route>
      </div>
    </>
  );
};

export default EmployeeMain;
