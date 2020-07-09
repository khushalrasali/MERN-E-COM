import { getCategory } from "../../admin/helper/adminapicall";

export const addItemToCard = (items, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...items });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeFromCartHelper = productId => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //console.log("CART", cart);
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = next => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    next();
  }
};
