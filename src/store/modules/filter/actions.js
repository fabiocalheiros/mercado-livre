export function addFilterCategoryRequest(category, products) {
  return {
    type: '@filter/FILTER_BY_CATEGORY_REQUEST',
    category,
    products,
  };
}

export function addFilterCategorySuccess(category, products) {
  return {
    type: '@filter/FILTER_BY_CATEGORY_SUCCESS',
    category,
    products,
  };
}
