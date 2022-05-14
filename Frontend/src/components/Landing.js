import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import { currentUser } from '../util/fetch/api';

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: 'employee' };
  }

  landingPage = (scope) => {
    let landingPage = '/buyer/search';

    if (scope === 'company') {
      landingPage = '/company/overview';
    }
    return landingPage;
  }
  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
    this.props.history.push(this.landingPage(scope));
  }

  handleOnLogin = () => {
    this.props.history.push(this.landingPage(this.state.currTab));
  }

  toggleLogin = () => {
    if (this.state.currTab === 'company') {
      this.setState({ currTab: 'employee' });
    } else {
      this.setState({ currTab: 'company' });
    }
  }

  render() {
    const { currTab } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <h2 className="mt-2">Welcome to <i>Insurify</i></h2>
            <div>{`Sign in as an insurance ${currTab == "company" ? "seller" : "buyer"}`}</div>
            <Login onLogin={this.handleOnLogin} type={currTab} />

              <div>Dont have a account ?&nbsp;&nbsp;</div>
              <div className="mt-2">
                  <a href="#/companySignup" className="btn-primary">Sign up as a seller</a>
              </div>
              <div className="mt-3">
                  <a href="#/buyerSignup" className="btn-primary">Sign up as a buyer</a>
              </div>
            <div className="mt-4">
              <button onClick={this.toggleLogin}>
                {currTab === 'employee'
                  ? 'Login as an insurance seller'
                  : 'Login as a insurance buyer'}
              </button>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
