const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const notFoundHandler = require('../middlewares/notFoundHandler');
const authHandler = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const URL_REGEX = require('../utils/constants');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().pattern(RegExp(URL_REGEX)).optional(),
  }),
}), createUser);

routes.use('/users', authHandler, require('./users'));
routes.use('/cards', authHandler, require('./cards'));

routes.use(notFoundHandler, authHandler);

module.exports = routes;
