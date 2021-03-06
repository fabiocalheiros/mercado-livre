import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../Util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container } from '../../components/Container/styles';

import ProductTable from '../../components/ProductTable';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  return (
    <Container>
      <ProductTable
        data={cart}
        total={total}
        removeFromCart={removeFromCart}
        updateAmountRequest={updateAmountRequest}
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
