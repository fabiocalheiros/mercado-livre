const baseState = []

export default function products(state, action) {
  switch (action.type) {
    case '@products/GET_PRODUCTS':
      return { products: action.products };
    case '@products/FILTER_PRODUCTS':
        console.log('action filter', action);
        console.log('state filter', state);
        return { products: action.products };
    default:
      return baseState;
  }
}
