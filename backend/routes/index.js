const routes = require('express').Router();
const notFoundHandler = require('../middlewares/notFoundHandler');
const authHandler = require('../middlewares/auth');

const {
  loginValidation,
  createUserValidation,
} = require('../utils/validation/authValidation');

const { login, createUser } = require('../controllers/users');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signin', loginValidation, login);

routes.post('/signup', createUserValidation, createUser);

routes.use('/users', authHandler, require('./users'));
routes.use('/cards', authHandler, require('./cards'));

routes.use(notFoundHandler);

module.exports = routes;
