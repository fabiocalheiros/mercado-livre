import { select, put, all, takeLatest } from 'redux-saga/effects';

import { addFilterCategorySuccess } from './actions';

function* filterByCategory({ category, products }) {
  console.log('chegou no sagas');
  console.log('category sagas', category);
  console.log('products sagas', products);
  const arrayNew = [];

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

  yield put(addFilterCategorySuccess(category, products));
}

export default all([
  takeLatest('@filter/FILTER_BY_CATEGORY_REQUEST', filterByCategory),
]);
