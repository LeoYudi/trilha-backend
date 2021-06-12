const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);
connection.authenticate()
  .then(() => { console.log('conexão criada') })
  .catch((error) => { console.log(error) });

module.exports = connection;