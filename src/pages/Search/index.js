import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toast } from 'react-toastify';
import { formatPrice } from '../../Util/format';

import ProductList from '../../components/ProductList';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

function Search(props, {addToCartRequest, addToFavoriteRequest}) {
  const [searchs, setSearchs] = useState([]);
  const [offset, setOffset] = useState(1);

  async function loadItens() {
    const term = props.match.params.id;

    const response = await api.get(`sites/MLB/search?q=${term}`, {
      params: {
        offset: offset * 50,
      },
    });

    const oldInfo = JSON.parse(localStorage.getItem('favorites'));
    const exists = oldInfo ? oldInfo : [];

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      favorite: exists.find(k => k.id === product.id) ? true : false,
    }));

    setSearchs(data);
  }

  useEffect(() => {
    loadItens();
  }, []);

  function handlePage(current, pageSize) {
    setOffset(current);
    loadItens();
    window.scrollTo(0, 0);
  }

  function handleAddProduct(product) {
    addToCartRequest(product);
  }

  function handleAddFavorite(product) {
    const listProducts = searchs;

    const oldInfo = JSON.parse(localStorage.getItem('favorites'));
    let hasFavorite;

    if (oldInfo) {
      hasFavorite = oldInfo.find(k => k.id === product.id);
    } else {
      hasFavorite = false;
    }

    if (hasFavorite) {
      toast.error('Este item já foi adicionado');
    } else {
      listProducts.forEach(item => {
        if (item.id === product.id) {
          item.favorite = !item.favorite;
        }
      });
      setSearchs(listProducts);
    }
    addToFavoriteRequest(product);
  }

  return (
    <>
      <ProductList
        products={searchs}
        handlePage={handlePage}
        handleAddProduct={handleAddProduct}
        handleAddFavorite={handleAddFavorite}
      />
    </>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
