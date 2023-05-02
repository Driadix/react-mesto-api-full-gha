const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../config');
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

  const newUserObject = newUser.toObject();
  delete newUserObject.password;

  res.status(201).send(newUserObject);
});

module.exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password);
  res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' }) });
});

module.exports.getAllUsers = tryCatch(async (req, res) => {
  const users = await User.find({});

  res.status(200).send(users);
});

const findUserDecorator = (controller) => async (req, res) => {
  const user = await User.findById(controller(req));
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');
  res.status(200).send(user);
};

module.exports.getUserById = tryCatch(findUserDecorator((req) => req.params.userId));

module.exports.getMyUser = tryCatch(findUserDecorator((req) => req.user._id));

const updateUserInfo = async (req, res, updateTarget) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateTarget,
    { new: true, runValidators: true },
  );
  if (!user) throw new NotFoundError('Не найден пользователь с указанным id');

  res.status(200).send(user);
};

module.exports.updateProfile = tryCatch(async (req, res) => {
  const { name, about } = req.body;
  await updateUserInfo(req, res, { name, about });
});

module.exports.updateAvatar = tryCatch(async (req, res) => {
  const { avatar } = req.body;
  await updateUserInfo(req, res, { avatar });
});
