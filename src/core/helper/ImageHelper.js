import React from "react";
import { API } from "../../backend";

export const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/3556117/pexels-photo-3556117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};
