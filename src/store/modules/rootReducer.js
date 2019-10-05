import { combineReducers } from 'redux';

import cart from './cart/reducer';
import favorite from './favorite/reducer';
import filter from './filter/reducer';

export default combineReducers({
  cart,
  favorite,
  filter,
});
