export default function products(state = [], action) {
  switch (action.type) {
    case '@products/GET_PRODUCTS_SUCCESS':
      return action.products.data.results;
    case '@products/FILTER_PRODUCTS_SUCCESS':
      console.log('action filter', action);
      console.log('state filter', state);
      return action.products;
    // return { products: action.products };
    default:
      return state;
  }
}
