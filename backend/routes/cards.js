const router = require('express').Router();

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
} = require('../utils/validation/cardValidation');

const {
  getAllCards,
  createCard,
  removeCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards); // Вернуть все карточки

router.post('/', createCardValidation, createCard); // Создать новую карточку

router.delete('/:cardId', deleteCardValidation, removeCardById); // Удалить карточку по id

router.put('/:cardId/likes', likeCardValidation, likeCard); // Поставить лайк карточке

router.delete('/:cardId/likes', dislikeCardValidation, dislikeCard); // Убрать лайк с карточки

module.exports = router;
