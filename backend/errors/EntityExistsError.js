class EntityExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EntityExistsError';
    this.statusCode = 409;
  }
}

module.exports = { EntityExistsError };
