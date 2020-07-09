import React, { useState, useEffect } from "react";
import { isAuthenticated } from "./auth/helper/index";
import {
  getmeToken,
  processThePayment
} from "./core/helper/paymentBraintreeHelper";
import { getCart, emptyCart } from "./core/helper/CardHelper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "./core/helper/OrderHelper";

export const Paymentbraintree = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    return getmeToken(userId, token)
      .then(data => {
        if (data.error) {
          setInfo({ ...info, error: data.error });
        } else {
          setInfo({ ...info, clientToken: data.clientToken });
        }
      })
      .catch(err => console.log("Error while getting clienttoken"));
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPayment = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getFinalAmount()
        };
        processThePayment(userId, token, paymentData)
          .then(responseData => {
            console.log("Brain tree success");
            setInfo({ ...info, loading: false, success: true });
            const productData = {
              products: products,
              transaction_id: responseData.transaction.id,
              amount: responseData.transaction.amount
            };
            //TODO: cretae product
            createOrder(userId, token, productData);
            //TODO: empty cart
            emptyCart(() => console.log("crash"));
            //TODO: force reload
            setReload(!reload);
          })
          .catch(err => {
            console.log("Brain tree failed");
            setInfo({ loading: false, success: false });
          });
      })
      .catch(err => console.log(err));
  };

  const getFinalAmount = () => {
    let amount = 0;
    console.log("PRODUCT STRIP", products);
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showBraintreeDropin = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPayment}>
              Buy
            </button>
          </div>
        ) : (
          <h4>Login or add item</h4>
        )}
      </div>
    );
  };

  return (
    <div>
      <h4>Payment is {getFinalAmount()} $</h4>
      {showBraintreeDropin()}
    </div>
  );
};
