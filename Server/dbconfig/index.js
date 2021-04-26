const Sequelize = require('sequelize');

const sequelize = new Sequelize('Library_Management_System','postgres','postgres',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});


module.exports.connect = sequelize;


