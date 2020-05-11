import express from 'express';

const app = express();

import Routes from './Routes';

app.use(express.json());
app.use(Routes);

app.listen(3333, () => {
  console.log('Server on, 3333');
});