import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SearchUsers from "./SearchUsers";
import Messaging from "./Messaging";
import "./Chat.css";

// eslint-disable-next-line react/prefer-stateless-function
class Chat extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/chat/" className="navbar-link">
                  Search Users
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/chat/messaging" className="navbar-link">
                  Messaging
                </Link>
              </li>
            </ul>
          </nav>
          <Route path="/chat/" exact component={SearchUsers} />
          <Route path="/chat/messaging" component={Messaging} />
        </Router>
      </div>
    );
  }
}
export default Chat;
