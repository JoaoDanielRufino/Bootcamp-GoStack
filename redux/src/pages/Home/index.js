import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src="https://secure-static.vans.com.br/medias/sys_master/vans/vans/h12/hf4/h00/h00/9543826702366/1002001020007U-01-BASEIMAGE-Midres.jpg" alt="Tenis" />    
        <strong>Tenis muito legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
}