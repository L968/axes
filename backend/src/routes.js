const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');

// Controllers
const UserController = require('./controllers/UserController');

// Validators
const UserValidator = require('./validators/User');

// Routes
routes.get('/user', UserController.index);
routes.post('/user', celebrate(UserValidator.create), UserController.create);

module.exports = routes;