import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signin, Authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "khushalrasali246@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirected: false
  });

  //Destructure
  const { email, password, error, loading, didRedirected } = values;
  const { user } = isAuthenticated();
  //to handle all change eventes
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //to hanlde after submit click
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(response => {
        console.log(response);
        if (response.message) {
          console.log(response);
          setValues({
            ...values,
            error: response.message,
            loading: false,
            didRedirected: false
          });
        } else {
          Authenticate(response, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: false,
              didRedirected: true
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        console.log("Error in sign in.");
      });
  };

  //performing redirect
  const performRedirect = () => {
    if (didRedirected) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  //construct loading message
  const performLoading = () => {
    return (
      // if loading is true other statement will run coz right opertor is returning componenet so default for that is true
      loading && (
        <div className="alert alert-info">
          <p>Loading data....</p>
        </div>
      )
    );
  };

  //construct error message
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const Signinform = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange("password")}
                value={password}
              ></input>
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in" description="A page to sign in">
      <h1>Sign in</h1>
      {performLoading()}
      {errorMessage()}
      {performRedirect()}
      {Signinform()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
