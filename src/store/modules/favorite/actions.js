export function addToFavoriteRequest(product) {
  return {
    type: '@favorite/ADD_REQUEST',
    product,
  };
}

export function addToFavoriteSucess(product) {
  return {
    type: '@favorite/ADD_SUCCESS',
    product,
  };
}

export function updateAmountRequestFavorite(product, amount) {
  return {
    type: '@favorite/UPDATE_AMOUNT_REQUEST',
    product,
    amount,
  };
}

export function updateAmountSuccessFavorite(product, amount) {
  return {
    type: '@favorite/UPDATE_AMOUNT_SUCCESS',
    product,
    amount,
  };
}

export function removeFromFavorite(id) {
  return {
    type: '@favorite/REMOVE',
    id,
  };
}
