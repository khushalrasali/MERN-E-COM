import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    sucess: false
  });
  //destructering
  const { name, email, password, error, sucess } = values;

  //function to handle all change events
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //To andle submit button click

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      name,
      email,
      password
    })
      .then(response => {
        if (response.message) {
          setValues({ ...values, error: response.message, sucess: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            sucess: true
          });
        }
      })
      .catch(console.log("Sign up error"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: sucess ? "" : "none" }}
          >
            New account created successfully .{" "}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };

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

  const SignupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
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
    <Base title="Sign up" description="A page to sign up">
      {successMessage()}
      {errorMessage()}
      {SignupForm()}
      <p>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
