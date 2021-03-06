const express = require('express');
const routes = express.Router();

const requireDir = require('require-dir');
const controllers = requireDir('./controllers');
const validators = requireDir('./validators');

// Middlewares
const authenticate = require('./middlewares/authenticate');

// Routes
routes.get('/user', controllers.UserController.index);
routes.get('/user/:id', validators.UserValidator.detail, controllers.UserController.detail);
routes.post('/user', validators.UserValidator.create, controllers.UserController.create);

routes.get('/resource', controllers.ResourceController.index);
routes.post('/resource', authenticate, validators.ResourceValidator.create, controllers.ResourceController.create);
routes.put('/resource/:id', authenticate, validators.ResourceValidator.update, controllers.ResourceController.update);

routes.post('/request', authenticate, validators.RequestValidator.create, controllers.RequestController.create);

routes.get('/department', controllers.DepartmentController.index);
routes.post('/department', authenticate, validators.DepartmentValidator.create, controllers.DepartmentController.create);

routes.post('/session', validators.SessionValidator.create, controllers.SessionController.create);

routes.get('/authenticate', authenticate, (request, response) => response.json({ isAuthenticated: true, user_id: request.user_id }));

module.exports = routes;