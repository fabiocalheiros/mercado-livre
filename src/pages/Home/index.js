import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { Pagination } from 'antd';
import { formatPrice } from '../../Util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    category: 'MLB3707',
    products: [],
    offset: 1,
  };

  async componentDidMount() {
    const { category } = this.state;

    const response = await api.get(`/sites/MLB/search?category=${category}`);

    console.tron.log(response);

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  loadItens = async () => {
    const { offset, category } = this.state;

    const response = await api.get(`/sites/MLB/search?category=${category}`, {
      params: {
        offset: offset * 50,
      },
    });

    const data = response.data.results.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  handlePage = async (current, pageSize) => {
    await this.setState({
      offset: current,
    });
    this.loadItens();
    window.scrollTo(0, 0);
  };

  handleAddProduct = product => {
    const { addToCartRequest } = this.props;

    addToCartRequest(product);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <>
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button
                type="button"
                onClick={() => this.handleAddProduct(product)}
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
        <Pagination onChange={this.handlePage} defaultCurrent={1} total={200} />
      </>
    );
  }
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
)(Home);
