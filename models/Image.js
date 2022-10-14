const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "restaurant",
                key: "id"
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'image'
    }
);

module.exports = Image;