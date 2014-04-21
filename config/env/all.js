var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  app: {
    name: 'dbRocket',
    title: "dbRocket ** Development MODE **"
  },
  root: rootPath,
  port: process.env.PORT || 3000,
  modelsDir : rootPath + '/app/models',
  showStackError: false,
  prettyHTML: false,
  db: {
    name: 'dbRocket',
    dialect: 'mysql',
    host: 'localhost',
    password: '',
    username: 'root',
    port: 3306
  }
};