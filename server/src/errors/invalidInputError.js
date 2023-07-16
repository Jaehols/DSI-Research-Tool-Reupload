const httpStatusCodes = require('../http/httpStatusCodes')
const BaseError = require('./baseError')

class InvalidInputError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Invalid Input provided'
  ) {
    super(statusCode, description)
  }
}

module.exports = InvalidInputError
