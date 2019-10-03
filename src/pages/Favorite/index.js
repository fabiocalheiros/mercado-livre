import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../Util/format';

import * as FavoriteActions from '../../store/modules/favorite/actions';

import ProductTable from '../../components/ProductTable';

import { Container } from '../../components/Container/styles';

function Favorite({
  favorite,
  total,
  removeFromFavorite,
  updateAmountRequestFavorite,
}) {
  return (
    <Container>
      <ProductTable
        data={favorite}
        total={total}
        removeFromCart={removeFromFavorite}
        updateAmountRequest={updateAmountRequestFavorite}
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  favorite: state.favorite.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: state.favorite.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);
