import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdAddShoppingCart, MdFavoriteBorder } from 'react-icons/md';
import { Pagination } from 'antd';
import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import { ProductList } from './styles';

function Home({amount, addToCartRequest, addToFavoriteRequest}) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('MLB1051');
  const [offset, setOffset] = useState(1);

  async function loadItens() {
    const response = await api.get(`/sites/MLB/search?category=${category}`, {
      params: {
        offset: offset * 50,
      },
    });

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
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
              <MdFavoriteBorder size={28} color="#666666" />
            </button>
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
            </Link>
            <strong>{product.title}</strong>
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
