import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper/index";
import { getCart, emptyCart } from "../core/helper/CardHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../admin/Orders";

export const StripeCheckout = ({
  products,
  setReload = f => f,
  reload: undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    error: false,
    success: false,
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().userId;

  const getFinalAmount = () => {
    let amount = 0;
    console.log("PRODUCT STRIP", products);
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayemnt = token => {
    //default tokens provided by stripe

    const body = {
      token,
      products
    };

    const header = {
      "Content-Type": "application/json"
    };

    return fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("STRIPE STATUS", response);
        //call further function
      })
      .catch(err => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_Y0flOb1G0ZOG76RU7dPF4QyF004SAYxyKg"
        token={makePayemnt}
        name="Buy for tees"
        amount={getFinalAmount() * 100}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/sigin">Signin</Link>
    );
  };

  return <div>{showStripeButton()}</div>;
};
