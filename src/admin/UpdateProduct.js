import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getProduct,
  updateProduct,
  getAllCategory
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

//match is provided by react under props
export const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });
  //destructe all values
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  //to perform before load
  const preLoad = productId => {
    console.log("product id", productId);
    getProduct(productId)
      .then(resp => {
        console.log("call api get products", resp);
        if (resp.message) {
          setValues({ ...values, error: resp.message });
        } else {
          loadCategory();
          setValues({
            ...values,
            name: resp.name,
            description: resp.description,
            price: resp.price,
            stock: resp.stock,
            category: resp.category._id,
            createdProduct: "",
            formData: new FormData()
          });

          console.log("call api get products");
        }
      })
      .catch(console.log("Error at categories"));
  };
  const loadCategory = () => {
    getAllCategory()
      .then(resp => {
        console.log("call api get categories", resp);
        if (resp.message) {
          setValues({ ...values, error: resp.message });
        } else {
          setValues({ categories: resp, formData: new FormData() });
          console.log("call api get categories", categories);
        }
      })
      .catch(console.log("Error at categories"));
  };
  //React function whch helps to load data before onload
  useEffect(() => {
    console.log(match.params.productID);
    preLoad(match.params.productID); //product is same name defined in route
  }, []);

  //handle changes
  const handleChanges = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    console.log("HANDLE", formData);
  };

  const sucessMessage = () => (
    //
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated sucessfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>Error : {error}</h4>
    </div>
  );

  //on click of submit button call API
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    // console.log("form data", formData);
    // console.log("user", user._id);
    // console.log("token", token);
    updateProduct(match.params.productID, user._id, token, formData)
      .then(resp => {
        if (resp.message) {
          setValues({ ...values, error: resp.message, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            stock: "",
            loading: false,
            createdProduct: resp.name
          });
        }
      })
      .catch(console.log("Error while creating product"));
  };

  const createProductForm = () => (
    <form>
      <span> Post Photo:</span>
      <div className="form-group">
        <lable className="btn btn-block btn-success">
          <input
            onChange={handleChanges("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </lable>
      </div>
      <div className="form-group">
        <input
          onChange={handleChanges("name")}
          name="name"
          className="form-control"
          placeholder="name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChanges("description")}
          name="description"
          className="form-control"
          placeholder="description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChanges("price")}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChanges("category")}
          className="form-control"
          placeholder="Category"
          name="category"
        >
          <option>select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChanges("stock")}
          type="Number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
          name="stock"
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update product
      </button>
    </form>
  );

  return (
    <Base
      title="Create product"
      description="All product are here"
      className="container bg-dark text-white"
    >
      <Link className="btn btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      {sucessMessage()}
      {errorMessage()}
      {createProductForm()}
    </Base>
  );
};
