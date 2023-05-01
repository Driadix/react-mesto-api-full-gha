// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  return res.status(error.statusCode).send({
    message: statusCode === 500 ? 'Произошло серверная ошибка' : message,
  });
};

module.exports = errorHandler;
