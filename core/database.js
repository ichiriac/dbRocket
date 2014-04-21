var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');

module.exports = function(app) {
  console.log('... connecting to the database');
  var db = app.config.db;
  var models = {};
  var sequelize = new Sequelize(
    db.name,
    db.username,
    db.password,
    {
      dialect: db.dialect,
      host: db.host,
      port: db.port
    }
  );

  sequelize
    .authenticate()
    .complete(function(err) {
      if (err) {
        console.log('Unable to connect to the database:', err);
      }
    })
  ;
  // returning the db.
  return _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, models);
};
