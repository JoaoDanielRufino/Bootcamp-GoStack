import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if(repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    if(prevState.repositories !== this.state.repositories) {
      localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const response = await api.get(`/repos/${this.state.newRepo}`);

    const data = {
      name: response.data.full_name
    }

    this.setState({ repositories: [...this.state.repositories, data], newRepo: '', loading: false });
  }

  render() {
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
      </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={this.state.newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={this.state.loading ? 1 : 0}> {/* Isso resolve um erro com o DOM */}
            { this.state.loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} /> }
          </SubmitButton>
        </Form>

        <List>
          {this.state.repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              {/* O encodeURIComponent retira a / do repo.name, ele transforma em uma uri valida */}
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
