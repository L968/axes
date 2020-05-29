const express = require('express');
const routes = express.Router();
const { celebrate } = require('celebrate');

// Middlewares
const authenticate = require('./middlewares/authenticate');

// Controllers
const UserController = require('./controllers/UserController');
const ResourceController = require('./controllers/ResourceController');
const SessionController = require('./controllers/SessionController');
const RequestController = require('./controllers/RequestController');

// Validators
const UserValidator = require('./validators/UserValidator');
const SessionValidator = require('./validators/SessionValidator');
const ResourceValidator = require('./validators/ResourceValidator');

// Routes
routes.get('/user', UserController.index);
routes.get('/user/:id', celebrate(UserValidator.detail), UserController.detail);
routes.post('/user', celebrate(UserValidator.create), UserController.create);

routes.get('/resource', ResourceController.index);
routes.post('/resource', authenticate, celebrate(ResourceValidator.create), ResourceController.create);
routes.put('/resource/:id', authenticate, celebrate(ResourceValidator.update), ResourceController.update);

routes.post('/request', RequestController.create);

routes.post('/session', celebrate(SessionValidator.create), SessionController.create);

routes.get('/authenticate', authenticate, (req, res) => res.json({ isAuthenticated: true, user_id: req.user_id }));

module.exports = routes;