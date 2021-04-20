'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('request', {
            id:                  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            requester_user_id:   { type: DataTypes.INTEGER, allowNull: false, },
            requestee_user_id:   { type: DataTypes.INTEGER, allowNull: false, },
            status_id:           { type: DataTypes.INTEGER, allowNull: false, },
            cancellation_reason: { type: DataTypes.STRING,  allowNull: true, },
            cancellation_date:   { type: DataTypes.DATE,    allowNull: true, },
        },
        {
            charset: 'utf8',
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('request');
    }
};