import React, { Component } from 'react';

import { Container } from './styles';
import api from '../../services/api';

import ListBreadcrumb from '../../components/ListBreadcrumb';

export default class Product extends Component {
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

  render() {
    const { categories, product } = this.state;

    return (
      <Container>
        <ListBreadcrumb data={categories} />
        <h1>Produto = </h1>
      </Container>
    );
  }
}
