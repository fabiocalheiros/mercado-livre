import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  MdAddShoppingCart,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md';
import { Pagination } from 'antd';
import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import { ProductList } from './styles';

function Home({ amount, addToCartRequest, addToFavoriteRequest }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('MLB1051');
  const [offset, setOffset] = useState(1);

  async function loadItens() {
    const response = await api.get(`/sites/MLB/search?category=${category}`, {
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
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <button
              type="button"
              className="addFavorire"
              onClick={() => handleAddFavorite(product)}
            >
              {product.favorite ? (
                <MdFavorite size={28} color="#666666" />
              ) : (
                <MdFavoriteBorder size={28} color="#666666" />
              )}
            </button>
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
            </Link>
            <strong>{product.title}</strong>
            <small>Itens disponíveis: {product.available_quantity}</small>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              className="addCart"
              onClick={() => handleAddProduct(product)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
      <Pagination onChange={handlePage} defaultCurrent={1} total={200} />
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
