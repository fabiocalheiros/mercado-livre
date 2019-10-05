import produce from 'immer';

export default function filter(state = [], action) {
  switch (action.type) {
    case '@filter/FILTER_BY_CATEGORY_SUCCESS':
      // return produce(state, draft => {
      //   const { category, products } = action;
      //   console.log('state', state)
      //   console.log('draft', draft)
      //   console.log('action', action)
      //   draft.push({products: null});
      // });
      return { products: [] };
    default:
      return state;
  }
}
