import produce from 'immer';

import history from '../../../services/history';

export default function search(state = [], action) {
  switch (action.type) {
    case '@search/REQUEST_LIST_SEARCH':
      console.log("requisição de busca");
      //history.push(`/search?s=lula`);
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
