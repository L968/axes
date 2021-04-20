'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('department', {
            id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name:   { type: DataTypes.STRING,  allowNull: false, },
            number: { type: DataTypes.STRING,  allowNull: false, unique: true},
            active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
        },
        {
            charset: 'utf8',
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('department');
    }
};
