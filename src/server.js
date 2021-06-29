const express = require('express');
const path = require('path');
const routes = require('./routes');
require('./database');

const app = express();

app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(5000, () => {
  console.log('rodando na porta 5000');
});