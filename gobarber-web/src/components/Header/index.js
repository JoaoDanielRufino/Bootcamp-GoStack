import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-purple.svg';

import Notifications from '../Notifications';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          
          <Profile>
            <div>
              <strong>Joao Daniel</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img src="https://api.adorable.io/avatars/285/aass@adosccsable.io.png" alt="Joao" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}