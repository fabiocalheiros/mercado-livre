import { select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatPrice } from '../../../Util/format';

import { addToCartSucess, updateAmountSuccess } from './actions';

function* addToCart({ product }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === product.id)
  );

  const stockAmount = product.available_quantity;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(product, amount));
  } else {
    const data = {
      ...product,
      amount: 1,
      priceFormatted: formatPrice(product.price),
    };

    yield put(addToCartSucess(data));
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
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
