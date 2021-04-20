'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id:                  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name:                { type: DataTypes.STRING,  allowNull: false, },
            id_number:           { type: DataTypes.STRING,  allowNull: false, unique: true },
            password:            { type: DataTypes.STRING,  allowNull: false, },
            password_expiration: { type: DataTypes.DATE,    allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            email:               { type: DataTypes.STRING,  allowNull: true, unique: true },
            department_id:       { type: DataTypes.INTEGER, allowNull: false, references: { model: 'department', key: 'id', }, },
            active:              { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
        },
        {
            charset: 'utf8',
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user');
    }
};