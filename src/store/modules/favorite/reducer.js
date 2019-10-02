import produce from 'immer';

export default function favorite(state = [], action) {
  switch (action.type) {
    case '@favorite/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);

        localStorage.setItem('favorite', JSON.stringify(product));
      });

    case '@favorite/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
