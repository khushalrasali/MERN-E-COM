import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Card } from "./Card";
import { getCart } from "./helper/CardHelper";
import { getmeToken, processThePayment } from "./helper/paymentBraintreeHelper";
import { Paymentbraintree } from "../paymentbraintree";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const preLoad = () => {
    setProducts(getCart());
  };

  useEffect(() => {
    preLoad();
  }, [reload]);

  const loadCart = products => {
    return (
      <div>
        <h4>A place to load cart values</h4>
        {products &&
          products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addToCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              />
            );
          })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <h4>A place to check out</h4>
      </div>
    );
  };

  return (
    <Base title="Cart" description="Place to checkout">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? loadCart(products) : <h3>NO products.</h3>}
        </div>
        <div className="col-6">
          <Paymentbraintree
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};
