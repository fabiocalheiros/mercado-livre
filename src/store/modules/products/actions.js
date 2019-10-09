// dispatch saga
export function getProductsRequest(products) {
  return {
    type: '@products/GET_PRODUCTS_REQUEST',
    products,
  };
}

// dispatch reducer
export function getProductsSuccess(products) {
  return {
    type: '@products/GET_PRODUCTS_SUCCESS',
    products,
  };
}

export function filterProducts(products, category) {
  return {
    type: '@products/FILTER_PRODUCTS',
    products,
    category,
  };
}
