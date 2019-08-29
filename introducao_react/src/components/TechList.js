import React, { Component } from 'react';

import TechItem from './TechItem';

export default class TechList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTech: '',
      techs: []
    };
  }

  componentDidMount() { // Executado assim que o componente aparece na tela
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(prevProps, prevState) { // Executado sempre que houver alteracoes nas props ou estado
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  componentWillUnmount() { // Executado quando o componente deixa de existir

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)} />
          ))}
        </ul>
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
        <button type="submit" >Enviar</button>
      </form>
    );
  }
}
