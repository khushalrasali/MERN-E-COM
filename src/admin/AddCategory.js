import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "./helper/adminapicall";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  //handle chnagess for textboxs
  const handleChanges = event => {
    setError("");
    setName(event.target.value);
  };

  //On submit utton click call API
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Call api
    createCategory(user._id, token, { name }).then(response => {
      if (response.message) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
      }
    });
  };

  //Sucess message
  const onSuccessMsg = () => {
    if (success) {
      return <h4 className="text-success">Created category successfully.</h4>;
    }
  };
  const onErrorMsg = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category.</h4>;
    }
  };

  const goBack = () => (
    <div className="btn btn-info my-3">
      <Link to="/admin/dashboard">Admin Home</Link>
    </div>
  );
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter new category</p>
        <input
          type="text"
          required
          autoFocus
          placeholder="For eg. summer"
          className="form-control my-3"
          onChange={handleChanges}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create category here"
      description="Add category for new tees"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {onSuccessMsg()}
          {onErrorMsg()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};
