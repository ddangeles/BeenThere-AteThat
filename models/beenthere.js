const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BeenThere extends Model {}

BeenThere.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        visited: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'beenthere'
    }
);

module.exports = BeenThere;