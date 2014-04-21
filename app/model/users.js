module.exports =  function(sequelize, DataTypes) {
  return {
    options: {
      tableName: 'users', // this will define the table's name
    },
    fields: {
      'name': Sequelize.STRING,
      'email': Sequelize.STRING,
      'password': Sequelize.STRING
    }
  };
};