'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('request_resource', {
            id:                  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            request_id:          { type: DataTypes.INTEGER, allowNull: false, },
            resource_id:         { type: DataTypes.INTEGER, allowNull: false, },
            include_exclude:     { type: DataTypes.STRING,  allowNull: false, },
            completed:           { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0, },
            responsible_user_id: { type: DataTypes.INTEGER, allowNull: false, },
        },
        {
            charset: 'utf8',
        }).then(() => queryInterface.addConstraint('request_resource', {
            fields: ['include_exclude'],
            type: 'check',
            where: {
                include_exclude: ['I', 'E']
            }
        }));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('request_resource');
    }
};