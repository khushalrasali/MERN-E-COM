import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              {" "}
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              {" "}
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              {" "}
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              {" "}
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              {" "}
              Mange orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header"> Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name :</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email :</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin Privilages</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin dashboard"
      description="Manage products here.."
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">{adminLeftSide()}</div>
        <div className="col-md-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

//export default AdminDashBoard;
