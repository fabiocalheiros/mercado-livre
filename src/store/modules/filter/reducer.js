import produce from 'immer';

export default function filter(state = [], action) {
  switch (action.type) {
    case '@filter/FILTER_BY_CATEGORY_SUCCESS':
      return produce(state, draft => {
        const { category, products } = action;
        console.log('chegou no reducer');
        console.log('category', category);
        console.log('products', products);
        draft.push(products);
      });
    default:
      return state;
  }
}
