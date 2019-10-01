import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Carousel, Row, Col } from 'antd';
import { MdAddShoppingCart } from 'react-icons/md';
import { Container, HeaderPage } from './styles';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import ListBreadcrumb from '../../components/ListBreadcrumb';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      categories: [],
      categoryId: props.match.params.id,
    };
  }

  async componentDidMount() {
    const { categoryId } = this.state;

    const response = await api.get(`/items/${categoryId}`);

    const { category_id } = response.data;

    const responseCategories = await api.get(`/categories/${category_id}`);

    const { path_from_root } = responseCategories.data;

    this.setState({
      product: response.data,
      categories: path_from_root,
    });
  }

  handleAddProduct = product => {
    const { addToCartRequest } = this.props;

    addToCartRequest(product);
  };

  render() {
    const { categories, product } = this.state;
    const { amount } = this.props;

    const images = product.pictures;

    return (
      <Container>
        <ListBreadcrumb data={categories} />

        <Row gutter={16} className="headerPage">
          <Col span={12}>
            <Carousel>
              {images &&
                images.map(image => (
                  <div key={image.id}>
                    <img src={image.url} alt={product.title} />
                  </div>
                ))}
            </Carousel>
          </Col>
          <Col span={12}>
            <HeaderPage>
              <div className="desc-produto">
                <p className="vendidos">25 vendidos</p>
                <h1>{product.title}</h1>
              </div>
            </HeaderPage>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <MdAddShoppingCart size={16} color="#fff" />
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </Col>
        </Row>
      </Container>
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
)(Product);
