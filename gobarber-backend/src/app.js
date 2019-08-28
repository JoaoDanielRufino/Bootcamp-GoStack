import 'dotenv/config';

import express from 'express';
import path from 'path';

import Youch from 'youch'; // Formatador de erros, json
import * as Sentry from '@sentry/node';
import 'express-async-errors'; // Necessario estar antes da importacao das rotas

import routes from './routes';
import sentryConfig from './config/sentry';


import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());

    // Como se fosse um metodo get
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // Quando um middleware recebe 4 parametros, o express 
    // entende que ele ira receber os erros da aplicacao.
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal error' });
    });
  }
}

export default new App().server;