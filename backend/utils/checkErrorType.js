const { Error } = require('mongoose');
const { isCelebrateError } = require('celebrate');
const { CastError } = require('../errors/CastError');
const { EntityExistsError } = require('../errors/EntityExistsError');

module.exports.checkErrorType = (error) => {
  if (isCelebrateError(error)) {
    return new CastError({ message: error.details.get('body').details[0].message });
  }
  if (error instanceof Error.CastError || error instanceof Error.ValidationError) {
    return new CastError({ message: error.message });
  }
  if (error.code === 11000) {
    return new EntityExistsError({ message: `${error}` });
  }
  return error;
};
