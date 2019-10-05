import { select, put, call, all, takeLatest } from 'redux-saga/effects';

import { getProducts, filterProducts } from './actions';

function* loadProducts() {

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

  yield getProducts();
}

function* loadFilteredProducts(products, category) {


  console.log('products in saga', products)
  console.log('category in saga', category)

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
  takeLatest('@products/GET_PRODUCTS', loadProducts),
  takeLatest('@products/FILTER_PRODUCTS', loadFilteredProducts),
]);
