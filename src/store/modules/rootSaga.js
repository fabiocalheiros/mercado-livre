import { all } from 'redux-saga/effects';

import cart from './cart/sagas';
import favorite from './favorite/sagas';
import filter from './filter/sagas';
import products from './products/sagas';

export default function* rootSaga() {
  return yield all([cart, favorite, filter, products]);
}
