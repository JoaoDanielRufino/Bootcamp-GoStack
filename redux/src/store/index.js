import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// O redux saga serve para adicionar um middleware entre uma action e
// um reducer, assim eh possivel modificar os dados que uma action
// esta enviando, e o reducer receber os dados necessarios ou 
// realizar alguma regra de negocio

export default store;