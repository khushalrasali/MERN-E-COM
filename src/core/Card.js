import React, { useState, useEffect } from "react";
import { ImageHelper } from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCard, removeFromCartHelper } from "./helper/CardHelper";

export const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  //function(data){return data},
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const cardTitle = product ? product.name : "I write code";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "DEFAULT";

  const addToCard = () => {
    addItemToCard(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = () => {
    return redirect && <Redirect to="/cart" />;
  };

  const showAddToCard = addToCart => {
    return (
      addToCart && (
        <button
          onClick={() => {
            addToCard();
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <div
          className="col-12"
          onClick={() => {
            removeFromCartHelper(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </div>
      )
    );
  };

  return (
    <div className="Card text-white bg-dark border border-info">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(false)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCard(addToCart)}
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};
