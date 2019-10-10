import React, {
  useState,
  useEffect,
  useLayoutEffect,
  setEffectLogs,
} from 'react';
import { toast } from 'react-toastify';
import { connect, useSelector, useDispatch } from 'react-redux';

import { Checkbox } from 'antd';

import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';
import * as ProductsActions from '../../store/modules/products/actions';

import ProductList from '../../components/ProductList';

function Home({
  products,
  addToCartRequest,
  addToFavoriteRequest,
  addFilterCategoryRequest,
  getProductsRequest,
  filterProducts,
}) {
  // const productsFromState = useSelector(state => state.products);
  // const [StateProducts, setStateProducts] = useState(products);
  // const [category] = useState('MLB1051');
  // const [offset, setOffset] = useState(1);
  const [listCategories, setlistCategories] = useState([]);

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }

  function filterCategories(data) {
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
    getProductsRequest();
  }

  useEffect(() => {
    loadItens();
  }, []);

  useEffect(() => {
    filterCategories(products);
  }, [products]);

  function handlePage(current, pageSize) {
    // setOffset(current);
    // getProductsRequest();
    window.scrollTo(0, 0);
  }

  function onChangeCheckBox(brand) {
    console.log('brand', brand);
    filterProducts(brand);
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
      // setStateProducts(listProducts);
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
            amount={1}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = {
  ...CartActions,
  ...FavoriteActions,
  ...ProductsActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
