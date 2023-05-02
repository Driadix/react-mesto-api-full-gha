const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../constants');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().pattern(RegExp(URL_REGEX)).optional(),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
};
