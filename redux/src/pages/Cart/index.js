import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />
            </td>
            <td>
              <strong>Tenis bonito</strong>
              <span>R$129,90</span>
            </td>
            <td>
              <div>
                <button type="button"><MdRemoveCircleOutline size={20} color="#7159c1" /></button>
                <input type="number" readOnly value={1} />
                <button type="button"><MdAddCircleOutline size={20} color="#7159c1" /></button>
              </div>
            </td>
            <td>
              <strong>R$258,80</strong>
            </td>
            <td>
              <button type="button"><MdDelete size={20} color="#7159c1" /></button>
            </td>
          </tr>
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>R$1920,28</strong>
        </Total>
      </footer>
    </Container>
  );
}