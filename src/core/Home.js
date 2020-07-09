import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import { Card } from "./Card";
import { getAllProduct } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const getProducts = () => {
    getAllProduct().then(data => {
      if (data.message) {
        setError(data.message);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Base title="Home Page" description="This is home page">
      <div className="row bg-dark text-center">
        <div className="row text-white">
          {products &&
            products.map((product, index) => {
              return (
                <div key={index} className="col-4">
                  <Card product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
}
