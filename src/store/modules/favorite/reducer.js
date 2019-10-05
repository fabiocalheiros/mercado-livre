import produce from 'immer';

export default function favorite(state = [], action) {
  switch (action.type) {
    case '@favorite/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });

    case '@favorite/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }

        const getItens = JSON.parse(localStorage.getItem('favorites'));
        const favIndex = getItens.findIndex(p => p.id === action.id);
        if (favIndex >= 0) {
          getItens.splice(favIndex, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(getItens));
      });
    case '@favorite/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    default:
      return state;
  }
}
