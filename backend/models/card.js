const mongoose = require('mongoose');
const URL_REGEX = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина строки должна составлять минимум 2 символа, получена строка {VALUE}'],
    maxlength: [30, 'Длина строки должна составлять максимум 30 символов, получена строка {VALUE}'],
    required: [true, 'Необходимо передать поле name в запрос'],
  },
  link: {
    type: String,
    required: [true, 'Необходимо передать поле link в запрос'],
    validate: URL_REGEX,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Необходимо передать поле owner в запрос'],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
