const Connection = require('./../dbconfig');
const {DataTypes,Model} = require('sequelize');
const dbConnection = Connection.connect;

module.exports = dbConnection.define('book', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    author:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    cost:{
        type: DataTypes.INTEGER
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);   






