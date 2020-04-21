import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../strore/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome e obrigatorio'),
  email: Yup.string().email('Insira um e-mail valiedo').required('O e-mail e obrigatorio'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha e obrigatoria')
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Criar Conta</button>
        <Link to="/">Ja tenho login</Link>
      </Form>
    </>
  );
}