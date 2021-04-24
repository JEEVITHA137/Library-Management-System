const Connection = require('./../dbconfig');
const {DataTypes} = require('sequelize');

const dbConnection = Connection.connect;

module.exports = dbConnection.define('borrow', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    user_id:{
        type: DataTypes.INTEGER,
    },
    book_id:{
        type: DataTypes.INTEGER,
    },
    start_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    end_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }
},
{
    freezeTableName: true,
    timestamps: false
});
