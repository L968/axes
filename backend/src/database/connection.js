const Sequelize = require('sequelize');
const dbConfigs = require('../config/database');
const requireDir = require('require-dir');
const models = requireDir('../models');

const config = process.env.NODE_ENV === 'test' ? dbConfigs.test : dbConfigs.development;

const connection = new Sequelize(config);

const modelsArray = Object.entries(models);

for (const model of modelsArray) {
    model[1].init(connection);
}

module.exports = connection;