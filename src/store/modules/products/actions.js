// dispatch saga
export function getProductsRequest() {
  return {
    type: '@products/GET_PRODUCTS_REQUEST',
  };
}

// dispatch reducer
export function getProductsSuccess(products) {
  return {
    type: '@products/GET_PRODUCTS_SUCCESS',
    products,
  };
}
// dispatch saga
export function filterProducts(category) {
  return {
    type: '@products/FILTER_PRODUCTS',
    category,
  };
}

export function filterProductsSuccess(products) {
  return {
    type: '@products/FILTER_PRODUCTS_SUCCESS',
    products,
  };
}
