const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  createCard,
  removeCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const URL_REGEX = require('../utils/constants');

router.get('/', getAllCards); // Вернуть все карточки

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(RegExp(URL_REGEX)).required(),
  }),
}), createCard); // Создать новую карточку

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeCardById); // Удалить карточку по id

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard); // Поставить лайк карточке

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard); // Убрать лайк с карточки

module.exports = router;
