const Sequelize = require('sequelize');
const dbConfigs = require('../config/database');
const requireDir = require('require-dir');
const models = requireDir('../models');

const config = process.env.NODE_ENV === 'test' ? dbConfigs.test : dbConfigs.development;

const connection = new Sequelize(config);

const modelsArr = Object.entries(models);

for (let i = 0; i < modelsArr.length; i++) {
    const model = modelsArr[i];

    model[1].init(connection);
}

module.exports = connection;