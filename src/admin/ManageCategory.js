import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";

export const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const { user, token } = isAuthenticated();

  //load data on preload

  const preload = () => {
    console.log("preload called");
    getAllCategory()
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setCategories(data);
        }
      })
      .catch(console.log("Error at preload of manage product"));
  };

  //rect function that gets called before load

  useEffect(() => {
    preload();
  }, []);

  //delete function
  const onDelete = categoryId => {
    deleteCategory(categoryId, user._id, token)
      .then(data => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          console.log("on delete sucess");
          //setProducts(data);
          preload();
        }
      })
      .catch(err => console.log("delete error", err));
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 Products</h2>

          {categories.map((category, index) => (
            <div key={index} className="row text-center mb-2">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    onDelete(category._id);
                  }}
                  className="btn btn-danger"
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};
