import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect, useSelector, useDispatch } from 'react-redux';

import { Checkbox } from 'antd';

import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';
import * as FilterActions from '../../store/modules/filter/actions';
import * as ProductsActions from '../../store/modules/products/actions';

import ProductList from '../../components/ProductList';

function Home({
  amount,
  addToCartRequest,
  addToFavoriteRequest,
  addFilterCategoryRequest,
  teste,
  getProducts,
  filterProducts
}) {
  const [products, setProducts] = useState([]);
  const productsFromState = useSelector(state => state.products);
  const [category] = useState('MLB1051');
  const [offset, setOffset] = useState(1);
  const [listCategories, setlistCategories] = useState([]);

  console.log('productsFromState', productsFromState);
  console.log('products new', products);

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }

  // REFACTOR: ISSO AQUI TEM QUE SER NO SAGA
  /* COM O REDUX + REDUX SAGA OS SEUS STATEFUL COMPONENTS
     IRÃO APENAS TER FUNCÕES QUE DISPARAM AS ACTIONS PRA VC TRATAR
     AS PARADAS NO SAGA. VOCÊ PODE USAR HOOKS AQUI SIM MAS VC VAI USAR MAIS
     O useSelector para selecionar os estados que vem do REDUX
  */
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

  //REFACTOR: ISSO AQUI VC TEM QUE FAZER NA SAGA
  async function loadItens() {
    const response = await api.get(`/sites/MLB/search?category=${category}`, {
      params: {
        offset: offset * 50,
      },
    });

    const oldInfo = JSON.parse(localStorage.getItem('favorites'));
    const exists = oldInfo || [];

    // dispatch({ type: ProductsActions.getProducts(response.data.results) });
    getProducts(response.data.results);

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      favorite: !!exists.find(k => k.id === product.id),
    }));

    setProducts(data);
    setListCategories(data);
  }

  useEffect(() => {
    console.log('quanto atualiza o checkbox caio aki sempre')
    loadItens();
  }, []);

  function handlePage(current, pageSize) {
    setOffset(current);
    loadItens();
    window.scrollTo(0, 0);
  }

  // FAZER ESSA FUNÇÃO DISPARAR UMA AÇÃO E FILTRAR NO SAGA PELO CATEGORY_ID
  function onChangeCheckBox(product) {
    console.log('product', product);
    filterProducts(productsFromState.products, product.category_id);
    // addFilterCategoryRequest(categoria, products);
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
            products={productsFromState.products}
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
  ...ProductsActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
