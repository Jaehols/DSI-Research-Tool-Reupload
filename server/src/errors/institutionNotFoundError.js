const httpStatusCodes = require('../http/httpStatusCodes');
const BaseError = require('./baseError');

class InstitutionNotFoundError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Institution not found'
  ) {
    super(statusCode, description);
  }
}

module.exports = InstitutionNotFoundError;
