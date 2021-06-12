const express = require('express');
const routes = require('./routes');
require('./database');

const app = express();

app.use(express.json());
app.use(routes);
app.listen(5000, () => {
  console.log('rodando na porta 5000');
});