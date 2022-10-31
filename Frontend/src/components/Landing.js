import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import { currentUser } from '../util/fetch/api';

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
    this.props.history.push('/company/overview');
  }

  handleOnLogin = () => {
    this.props.history.push('/company/overview');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <h2 className="mt-2">Welcome to <i>Insurify</i></h2>
            <Login onLogin={this.handleOnLogin} type={'company'} />
            <div>Dont have a account ?&nbsp;&nbsp;</div>
            <div className="mt-3">
                <a href="#/companySignup" className="btn-primary">Sign up as a seller</a>
            </div>
            <div className="mt-4">
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
