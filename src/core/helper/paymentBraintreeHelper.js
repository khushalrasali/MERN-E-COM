import { API } from "../../backend";

export const getmeToken = (userId, token) => {
  return fetch(`${API}/payment/braintree/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applicatio/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const processThePayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/processpayment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicatio/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
