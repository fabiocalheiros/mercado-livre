import { select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatPrice } from '../../../Util/format';

import { addToFavoriteSucess, updateAmountSuccess } from './actions';

function* addToFavorite({ product }) {
  const productExists = yield select(state =>
    state.favorite.find(p => p.id === product.id)
  );

  if (!productExists) {
    const data = {
      ...product,
      amount: 1,
      priceFormatted: formatPrice(product.price),
    };

    yield put(addToFavoriteSucess(data));
  } else {
    toast.error('Este item já foi adicionado');
  }
}

function* updateAmount({ product, amount }) {
  if (amount <= 0) return;

  const stockAmount = product.available_quantity;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(product, amount));
}

export default all([
  takeLatest('@favorite/ADD_REQUEST', addToFavorite),
  takeLatest('@favorite/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
