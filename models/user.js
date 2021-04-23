const Connection = require('./../dbconfig');
const {DataTypes} = require('sequelize');

const dbConnection = Connection.connect;

module.exports = dbConnection.define('users', {
    user_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false
});

