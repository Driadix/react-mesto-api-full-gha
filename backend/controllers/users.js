const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { tryCatch } = require('../utils/tryCatch');
const { NotFoundError } = require('../errors/NotFoundError');

module.exports.createUser = tryCatch(async (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const hashPsw = await bcrypt.hash(password, 16);

  const newUser = await User.create({
    name, about, avatar, email, password: hashPsw,
  });

  res.status(200).send({
    name: newUser.name,
    about: newUser.about,
    avatar: newUser.avatar,
    _id: newUser._id,
  });
});

module.exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password);
  if (user) {
    res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' }) });
  }
});

module.exports.getAllUsers = tryCatch(async (req, res) => {
  const users = await User.find({});

  res.status(200).send(users);
});

module.exports.getUserById = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');

  res.status(200).send({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id,
  });
});

module.exports.getMyUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');

  res.status(200).send(user);
});

module.exports.updateProfile = tryCatch(async (req, res) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  );
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');

  res.status(200).send(user);
});

module.exports.updateAvatar = tryCatch(async (req, res) => {
  const { avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  );
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');

  res.status(200).send(user);
});
