import React from 'react';
import PropTypes from 'prop-types';

function TechItem(props) { // tambem pode ser feito como ({ tech, onDelete }), desestroturando
  return (
    <li>
      {props.tech}
      <button onClick={props.onDelete} type="button">Remover</button>
    </li>
  );
}

TechItem.defaultProps = { // Preenche com o default, caso nao seja informado as porpiedades
  tech: 'Oculto'
}

TechItem.propTypes = { // Definindo o tipo das props
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
}

export default TechItem;