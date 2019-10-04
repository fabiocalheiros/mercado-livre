import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import ProductList from '../../components/ProductList';

function Home({ amount, addToCartRequest, addToFavoriteRequest }) {
  const [products, setProducts] = useState([]);
  const [category] = useState('MLB1051');
  const [offset, setOffset] = useState(1);

  async function loadItens() {
    const response = await api.get(`/sites/MLB/search?category=${category}`, {
      params: {
        offset: offset * 50,
      },
    });

    const oldInfo = JSON.parse(localStorage.getItem('favorites'));
    const exists = oldInfo || [];

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      favorite: !!exists.find(k => k.id === product.id),
    }));

    setProducts(data);
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
    const listProducts = products;

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
      setProducts(listProducts);
    }
    addToFavoriteRequest(product);
  }

  return (
    <>
      <ProductList
        products={products}
        handlePage={handlePage}
        handleAddProduct={handleAddProduct}
        handleAddFavorite={handleAddFavorite}
        amount={amount}
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

const mapDispatchToProps = {
  ...CartActions,
  ...FavoriteActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
