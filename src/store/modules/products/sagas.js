import { select, put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { getProductsSuccess, filterProducts } from './actions';

import { formatPrice } from '../../../Util/format';

function* getProductsRequest() {
  console.log('caiu no saga pra carregar os produtos');
  async function loadItens() {
    const offset = 1;
    const response = await api.get(`/sites/MLB/search?category=MLB1051`, {
      params: {
        offset: offset * 50,
      },
    });

    // const oldInfo = JSON.parse(localStorage.getItem('favorites'));
    // const exists = oldInfo || [];
    // const data = response.data.results.map(product => ({
    //   ...product,
    //   priceFormatted: formatPrice(product.price),
    //   favorite: !!exists.find(k => k.id === product.id),
    // }));
    return response;
  }

  const dataRequest = loadItens();

  // console.log('dataRequest', dataRequest);
  yield put(getProductsSuccess(dataRequest));
}

function* loadFilteredProducts(products, category) {
  console.log('products in saga', products);
  console.log('category in saga', category);

  // products.map(item => {
  //   item.attributes.map(attr => {
  //     if (attr.id === 'BRAND' && attr.value_name === 'Apple') {
  //       return item;
  //     }
  //   });
  // });

  // ******* unica coisa que funciona *********
  // products.splice(0, 47);

  // products.find(p =>
  //   p.attributes.find(i => i.id === 'BRAND' && i.value_name === 'Apple')
  // );

  // console.log('filtro realizado', arrayNew);

  yield filterProducts(products, category);
}

export default all([
  takeLatest('@products/GET_PRODUCTS_REQUEST', getProductsRequest),
  takeLatest('@products/FILTER_PRODUCTS', loadFilteredProducts),
]);
