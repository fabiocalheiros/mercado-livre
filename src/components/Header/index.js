import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdShoppingBasket, MdFavoriteBorder, MdSearch } from 'react-icons/md';
import { connect } from 'react-redux';

import history from '../../services/history';

import { Container, Cart, Favoritos } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartSize, favoriteSize }) {
  const [newSearch, setNewSearch] = useState('');

  function handledSearch() {
    history.push(`/search?s=${newSearch}`);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      history.push(`/search?s=${newSearch}`);
    }
  }

  return (
    <Container>
      <Link to="/">
        {/* <img src={logo} alt="Rocketshoes" /> */}
      </Link>

      <div className="searchCustom">
        <input
          type="text"
          placeholder="Digite aqui o que você procura"
          onKeyDown={e => handleKeyDown(e)}
          onChange={e => setNewSearch(e.target.value)}
        />
        <button type="button" onClick={handledSearch}>
          <MdSearch size={22} color="#666" />
        </button>
      </div>

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
  favoriteSize: localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites')).length
    : state.favorite.length,
}))(Header);
