import 'reflect-metadata';

import express from 'express';

import Routes from './Routes';

import './database';

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(3333, () => {
  console.log('Server on, 3333');
});