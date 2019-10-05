export function getProducts(products) {

  return {
    type: '@products/GET_PRODUCTS',
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
