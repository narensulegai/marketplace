import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signupCompany, signupEmployee } from '../util/fetch/api';

const Signup = ({ type, history }) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSignUp = () => {
    const d = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (type === "company") {
      signupCompany(d)
        .then(({ token }) => {
          window.localStorage.setItem('token', token);
          history.push('/company/overview');
        });
    }
    if (type === 'employee') {
      signupEmployee(d)
        .then(({ token }) => {
          window.localStorage.setItem('token', token);
          history.push(`/buyer/${window.location.hash.split('/').at(-1)}/questioner`);
        });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-3" />
        <div className="col-6">
          <h2 className="mt-5">{type === 'company' ? 'Insurify' : window.location.search.slice(1).replace("%20", " ")}</h2>
          <div className="mt-2">Signup as an insurance {type === 'company' ? 'seller' : 'buyer'}</div>
          <div className="form-group mt-5">
            <input type="text" ref={name} placeholder={type === 'company' ? 'Insurance provider name' : 'Name'} className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" ref={email} placeholder="Email" className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" ref={password} placeholder="Password" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn-primary" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="col-3" />
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
  history: PropTypes.any,
};

export default withRouter(Signup);
