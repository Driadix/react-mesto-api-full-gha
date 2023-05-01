const { NotFoundError } = require('../errors/NotFoundError');

const notFoundHandler = (req, res, next) => next(new NotFoundError('Страницы не существует!'));

module.exports = notFoundHandler;
