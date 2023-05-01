const Card = require('../models/card');
const { tryCatch } = require('../utils/tryCatch');
const { NotEnoughPermissionError } = require('../errors/NotEnoughPermissionError');
const { NotFoundError } = require('../errors/NotFoundError');

module.exports.getAllCards = tryCatch(async (req, res) => {
  const cards = await Card.find({});

  res.status(200).send(cards);
});

module.exports.createCard = tryCatch(async (req, res) => {
  const { name, link } = req.body;
  const card = await Card.create({ name, link, owner: req.user._id });
  res.status(200).send(card);
});

module.exports.removeCardById = tryCatch(async (req, res) => {
  const { cardId } = req.params;

  const card = await Card.findById(cardId).populate('owner');
  if (!card) throw new NotFoundError('Карточка с указанным _id не найдена');
  if (card.owner._id.toString() !== req.user._id.toString()) throw new NotEnoughPermissionError('Вы не можете удалить чужие карточки');

  await Card.findByIdAndRemove(cardId);
  res.status(200).send(card);
});

module.exports.likeCard = tryCatch(async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  );
  if (!card) throw new NotFoundError('Передан несуществующий _id карточки');

  res.status(200).send({ message: card });
});

module.exports.dislikeCard = tryCatch(async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  );
  if (!card) throw new NotFoundError('Передан несуществующий _id карточки');

  res.status(200).send({ message: card });
});
