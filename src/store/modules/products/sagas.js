import { select, put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { getProductsSuccess, filterProductsSuccess } from './actions';

// import { formatPrice } from '../../../Util/format';

function apiGet() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const offset = 1;
      const response = api.get(`/sites/MLB/search?category=MLB1051`, {
        params: {
          offset: offset * 50,
        },
      });
      resolve(response);
    });
  });
}

function* getProductsRequest() {
  try {
    const response = yield call(apiGet);
    yield put(getProductsSuccess(response));
  } catch (err) {
    console.log(err);
  }
}

function* filterProducts(action) {
  console.log('category in saga', action.category);

  const stateProducts = yield select(state => state.products);

  const arrayNew = [];

  stateProducts.map(item => {
    item.attributes.map(attr => {
      if (attr.id === 'BRAND' && attr.value_name === action.category) {
        arrayNew.push(item);
      }
    });
  });

  console.log(arrayNew);

  yield put(filterProductsSuccess(arrayNew));
}

export default all([
  takeLatest('@products/GET_PRODUCTS_REQUEST', getProductsRequest),
  takeLatest('@products/FILTER_PRODUCTS', filterProducts),
]);
