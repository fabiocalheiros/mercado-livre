export function addToCartRequest(product) {
  return {
    type: '@cart/ADD_REQUEST',
    product,
  };
}

export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function updateAmountRequest(product, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    product,
    amount,
  };
}

export function updateAmountSuccess(product, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    product,
    amount,
  };
}

export function addFilterCategory(category) {
  return {
    type: '@cart/FILTER_BY_CATEGORY',
    category,
  };
}
