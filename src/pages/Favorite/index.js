import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { formatPrice } from '../../Util/format';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import ProductTable from '../../components/ProductTable';

import { Container } from '../../components/Container/styles';

function Favorite({
  favorite,
  total,
  removeFromFavorite,
  updateAmountRequestFavorite,
}) {
  const [favorites, setFavorites] = useState(favorite);

  const fetchFavorites = async () => {
    const storageFavorites = localStorage.getItem('favorites');
    if (storageFavorites) {
      setFavorites(JSON.parse(storageFavorites));
    } else {
      setFavorites(favorite);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Container>
      <ProductTable
        data={favorites}
        total={total}
        removeFromCart={removeFromFavorite}
        updateAmountRequest={updateAmountRequestFavorite}
      />
    </Container>
  );
}

function mapStateToProps(state) {
  const storageFavorites =
    JSON.parse(localStorage.getItem('favorites')) || state.favorite;

  const data = {
    favorite: storageFavorites.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    })),
    total: storageFavorites.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0),
  };
  return data;
}

const mapDispatchToProps = {
  ...CartActions,
  ...FavoriteActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);
