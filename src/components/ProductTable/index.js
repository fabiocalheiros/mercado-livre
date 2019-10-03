import React from 'react';
import { Link } from 'react-router-dom';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { ProductTableStyles, Total } from './styles';

import { formatPrice } from '../../Util/format';

export default function ProductTable({
  data,
  total,
  removeFromCart,
  updateAmountRequest,
}) {
  function increment(product) {
    updateAmountRequest(product, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product, product.amount - 1);
  }

  return (
    <>
      <ProductTableStyles>
        <thead>
          <tr>
            <th> </th>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.id}>
              <td>
                <Link to={`/product/${product.id}`}>
                  <img src={product.thumbnail} alt={product.title} />
                </Link>
              </td>
              <td>
                <strong>{product.title}</strong>
                <small>Itens disponíveis: {product.available_quantity}</small>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    onClick={() => removeFromCart(product.id)}
                    size={20}
                    color="#7159c1"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTableStyles>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(total)}</strong>
        </Total>
      </footer>
    </>
  );
}
