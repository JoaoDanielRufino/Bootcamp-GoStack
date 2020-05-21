import 'reflect-metadata';

import express from 'express';

import Routes from './Routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Routes);

app.listen(3333, () => {
  console.log('Server on, 3333');
});