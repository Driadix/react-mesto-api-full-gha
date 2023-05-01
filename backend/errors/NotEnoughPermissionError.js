class NotEnoughPermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotEnoughPermissionError';
    this.statusCode = 403;
  }
}

module.exports = { NotEnoughPermissionError };
