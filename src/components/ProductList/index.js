import React from 'react';
import { Link } from 'react-router-dom';

import {
  MdAddShoppingCart,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md';
import { Pagination } from 'antd';

import { ProductListStyles } from './styles';

export default function ProductList({products, handleAddFavorite, handleAddProduct, handlePage, amount}) {
  console.log(products);

  return (
    <>
      <ProductListStyles>
        {products &&
          products.map(product => (
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
      </ProductListStyles>
      <Pagination onChange={handlePage} defaultCurrent={1} total={200} />
    </>
  );
}
