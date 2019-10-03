import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Favorite from './pages/Favorite';
import Search from './pages/Search';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/product/:id" component={Product} />
      <Route path="/favorites" component={Favorite} />
      <Route path="/search/:id" component={Search} />
    </Switch>
  );
}
