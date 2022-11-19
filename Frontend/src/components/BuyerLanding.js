import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import { currentUser } from "../util/fetch/api";

export class BuyerLanding extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minimizeBot: false,
      companyName: (window.location.search.slice(1).replace("%20", " ")),
    };
  }

  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
  }
  
  setMinimizeBot = () => {
    const minimizeBot = this.state.minimizeBot;
    this.setState({
      minimizeBot: !minimizeBot,
    });
  };

  handleOnLogin = () => {
    this.props.history.push(`${window.location.hash.slice(1)}/questioner`);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <h2 className="mt-2">
              Welcome to <i>{this.state.companyName}</i>
            </h2>
            <div>{`Sign in to your account`}</div>
            <Login onLogin={this.handleOnLogin} type="employee" />
            <div>Dont have a account ?&nbsp;&nbsp;</div>
            <div className="mt-3">
              <a
                href={`#/buyerSignup/${window.location.hash.split("/").at(-1)}`}
                className="btn-primary"
              >
                Sign up as a buyer
              </a>
            </div>
            <div className="mt-4"></div>
            <div className="mt-4"></div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(BuyerLanding);
