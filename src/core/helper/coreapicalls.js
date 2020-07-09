import { API } from "../../backend";

//READ ALL PRODUCTS
export const getAllProduct = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
