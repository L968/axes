'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('resource', {
            id:                 { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name:               { type: DataTypes.STRING,  allowNull: false, unique: true },
            description:        { type: DataTypes.STRING,  allowNull: true, },
            responsible_department_id: { type: DataTypes.INTEGER, allowNull: false, },
            parent_resource_id: { type: DataTypes.INTEGER, allowNull: true, },
            active:             { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 1},
        },
        {
            charset: 'utf8',
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('resource');
    }
}