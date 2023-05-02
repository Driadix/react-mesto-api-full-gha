const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../constants');

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}); // Обновить профиль

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(RegExp(URL_REGEX)),
  }),
}); // Обновить аватар

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  updateProfileValidation,
  updateAvatarValidation,
  getUserByIdValidation,
};
