import { put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatPrice } from '../../../Util/format';

import { addToFavoriteSucess, updateAmountSuccess } from './actions';

function* addToFavorite({ product }) {
  let oldInfo = JSON.parse(localStorage.getItem('favorites'));

  const data = {
    ...product,
    amount: 1,
    priceFormatted: formatPrice(product.price),
  };

  if (!(oldInfo instanceof Array)) oldInfo = [];
  oldInfo.push(data);
  localStorage.setItem('favorites', JSON.stringify(oldInfo));
  yield put(addToFavoriteSucess(localStorage));
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
