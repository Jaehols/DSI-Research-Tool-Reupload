const httpStatusCodes = require('../http/httpStatusCodes');
const BaseError = require('./baseError');

class AuthorNotFoundError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Author not found'
  ) {
    super(statusCode, description);
  }
}

module.exports = AuthorNotFoundError;
