import { select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatPrice } from '../../../Util/format';

import { addToFavoriteSucess } from './actions';

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

export default all([takeLatest('@favorite/ADD_REQUEST', addToFavorite)]);
