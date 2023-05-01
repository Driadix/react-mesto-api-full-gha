const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const URL_REGEX = require('../utils/constants');

router.get('/', getAllUsers); // Получить всех пользователей

router.get('/me', getMyUser); // Найти информацию о себе

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile); // Обновить профиль

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(RegExp(URL_REGEX)),
  }),
}), updateAvatar); // Обновить аватар

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById); // Найти пользователя по ID

module.exports = router;
