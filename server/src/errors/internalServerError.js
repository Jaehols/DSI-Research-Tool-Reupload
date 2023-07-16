const httpStatusCodes = require('../http/httpStatusCodes');
const BaseError = require('./baseError');

class InternalServerError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = 'Internal Server Error'
  ) {
    super(statusCode, description);
  }
}

module.exports = InternalServerError;
