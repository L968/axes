const Sequelize = require('sequelize');
const dbConfigs = require('../config/database');

const config = process.env.NODE_ENV === 'test' ? dbConfigs.test : dbConfigs.development;

const connection = new Sequelize(config);

const User = require('../models/User');
User.init(connection);

module.exports = connection;