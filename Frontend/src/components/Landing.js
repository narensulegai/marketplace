import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import { currentUser } from "../util/fetch/api";

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

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minimizeBot: false,
    };
  }
  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
    this.props.history.push("/company/overview");
  }

  setMinimizeBot = () => {
    const minimizeBot = this.state.minimizeBot;
    this.setState({
      minimizeBot: !minimizeBot,
    });
  };

  handleOnLogin = () => {
    this.props.history.push("/company/overview");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <h2 className="mt-2">
              Welcome to <i>Insurify</i>
            </h2>
            <Login onLogin={this.handleOnLogin} type={"company"} />
            <div>Dont have a account ?&nbsp;&nbsp;</div>
            <div className="mt-3">
              <a href="#/companySignup" className="btn-primary">
                Sign up as a seller
              </a>
            </div>
            <div className="mt-4"></div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
