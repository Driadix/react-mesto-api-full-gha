const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { EntityExistsError } = require('../errors/EntityExistsError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const URL_REGEX = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина строки должна составлять минимум 2 символа, получена строка {VALUE}'],
    maxlength: [30, 'Длина строки должна составлять максимум 30 символов, получена строка {VALUE}'],
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Длина строки должна составлять минимум 2 символа, получена строка {VALUE}'],
    maxlength: [30, 'Длина строки должна составлять максимум 30 символов, получена строка {VALUE}'],
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: URL_REGEX,
  },
  email: {
    type: String,
    required: [true, 'Необходимо передать поле email в запрос'],
    unique: [true, 'Данный email уже зарегистрирован в системе'],
    validate: [validator.isEmail, 'Переданное поле не является валидной электронной почтой'],
  },
  password: {
    type: String,
    required: [true, 'Необходимо передать поле password в запрос'],
    select: false,
  },
});

userSchema.post('save', (error, res, next) => {
  if (error.code === 11000) {
    next(new EntityExistsError('Данный Email уже существует'));
  } else {
    next();
  }
});

userSchema.statics.findUserByCredentials = async function checkUser(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
