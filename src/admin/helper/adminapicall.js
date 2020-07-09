import { API } from "../../backend";

//--------------CATEGORY CALLS--------------------

export const createCategory = (userID, token, category) => {
  return fetch(`${API}/category/user/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.log(err));
};

export const updateACategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(resp => {
      return resp.json();
    })
    .catch(err => console.log(err));
};

export const getCategory = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json"
  })
    .then(resp => resp.json())
    .catch(err => console.log(err));
};

//--------------PRODUCTS CALLS--------------------

//READ ALL PRODUCTS
export const getAllProduct = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//CREATE A PRODUCT
export const createProduct = (userID, token, products) => {
  console.log("API", products);
  return fetch(`${API}/product/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: products
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//READ A PRODUCT
export const getProduct = productID => {
  return fetch(`${API}/product/${productID}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//UPDATE A PRODUCT
export const updateProduct = (productID, userID, token, products) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: products
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//DELETE A PRODUCT
export const deleteProduct = (productID, userID, token) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log("Delete", response);
      return response.json();
    })
    .catch(err => console.log(err));
};
