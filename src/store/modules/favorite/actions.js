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

export function removeFromFavorite(id) {
  return {
    type: '@favorite/REMOVE',
    id,
  };
}
