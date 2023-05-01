const { checkErrorType } = require('./checkErrorType');

module.exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res);
  } catch (error) {
    return next(checkErrorType(error));
  }
};
