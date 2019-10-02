import React from 'react';
import { Link } from 'react-router-dom';

import { MdShoppingBasket, MdFavoriteBorder } from 'react-icons/md';

import { connect } from 'react-redux';

import { Container, Cart, Favoritos } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartSize, favoriteSize }) {
  return (
    <Container>
      <Link to="/">
        {/* <img src={logo} alt="Rocketshoes" /> */}
      </Link>

      <div className="itens-right">
        <Favoritos to="/favorites">
          <div>
            <strong>Favoritos</strong>
            <span>{favoriteSize} itens</span>
          </div>
          <MdFavoriteBorder size={36} color="#fff" />
        </Favoritos>

        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#fff" />
        </Cart>
      </div>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
  favoriteSize: state.favorite.length,
}))(Header);
