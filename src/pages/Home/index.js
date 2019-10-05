import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { Checkbox } from 'antd';

import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';
import * as FilterActions from '../../store/modules/filter/actions';

import ProductList from '../../components/ProductList';

function Home({
  amount,
  addToCartRequest,
  addToFavoriteRequest,
  addFilterCategoryRequest,
  teste,
}) {
  const [products, setProducts] = useState([]);
  const [category] = useState('MLB1051');
  const [offset, setOffset] = useState(1);
  const [listCategories, setlistCategories] = useState([]);

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }

  function setListCategories(data) {
    const arrayNew = [];

    data.map(item => {
      item.attributes.map(attr => {
        if (attr.id === 'BRAND') {
          arrayNew.push(attr.value_name);
        }
      });
    });

    const uniqueNames = uniq(arrayNew);
    setlistCategories(uniqueNames);
  }

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

    console.log(data);

    setProducts(data);
    setListCategories(data);
  }

  useEffect(() => {
    console.log('aqui');
    console.log('teste', teste);
    loadItens();
  }, []);

  function handlePage(current, pageSize) {
    setOffset(current);
    loadItens();
    window.scrollTo(0, 0);
  }

  function onChangeCheckBox(categoria) {
    console.log('filtrar por: ', categoria);
    addFilterCategoryRequest(categoria, products);
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
      <div className="out-site">
        <div className="sidebar">
          <h2>Propriedades</h2>
          <ul>
            {listCategories.map(item => (
              <li key={item}>
                <Checkbox onChange={() => onChangeCheckBox(item)}>
                  {item}
                </Checkbox>
              </li>
            ))}
          </ul>
        </div>
        <div className="out-view">
          <ProductList
            products={products}
            handlePage={handlePage}
            handleAddProduct={handleAddProduct}
            handleAddFavorite={handleAddFavorite}
            amount={amount}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
  teste: state.filter,
});

const mapDispatchToProps = {
  ...CartActions,
  ...FavoriteActions,
  ...FilterActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
