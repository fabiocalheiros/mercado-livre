import React, { Component } from 'react';

import ReactImageMagnify from 'react-image-magnify';

import { Container, HeaderPage } from './styles';
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
        <HeaderPage>
          <div className="gallery">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src:
                    'https://http2.mlstatic.com/drone-com-controle-remoto-ky601-com-cmera-helicptero-azul-D_NQ_NP_953287-MLB31730214038_082019-F.webp',
                },
                largeImage: {
                  src:
                    'https://http2.mlstatic.com/drone-com-controle-remoto-ky601-com-cmera-helicptero-azul-D_NQ_NP_953287-MLB31730214038_082019-F.webp',
                  width: 1064,
                  height: 563,
                },
              }}
            />
          </div>
          <div className="desc-produto">
            <p className="vendidos">25 vendidos</p>
            <h1>{product.title}</h1>
          </div>
        </HeaderPage>
      </Container>
    );
  }
}
