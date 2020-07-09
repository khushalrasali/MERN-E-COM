import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import { PrivateRoute } from "../src/auth/helper/PrivateRoutes";
import { AdminRoute } from "../src/auth/helper/AdminRoutes";
import { UserDashBoard } from "./user/UserDashBoard";
import { AdminDashBoard } from "./user/AdminDashBoard";
import { Profile } from "./user/Profile";
import { AddCategory } from "./admin/AddCategory";
import { AddProduct } from "./admin/AddProduct";
import { ManageProducts } from "./admin/ManageProducts";
import { Orders } from "./admin/Orders";
import { ManageCategory } from "./admin/ManageCategory";
import { UpdateProduct } from "./admin/UpdateProduct";
import { UpdateCategory } from "./admin/UpdateCategory";
import { Cart } from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute exact path="/admin/orders" component={Orders} />
        <AdminRoute exact path="/admin/categories" component={ManageCategory} />
        <AdminRoute
          exact
          path="/admin/product/update/:productID"
          component={UpdateProduct}
        />
        <AdminRoute
          exact
          path="/admin/category/update/:categoryID"
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
