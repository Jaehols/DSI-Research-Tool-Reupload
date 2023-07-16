const httpStatusCodes = require('../http/httpStatusCodes')
const BaseError = require('./baseError')

class TooManyRequestsError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.TOO_MANY_REQUESTS,
    description = 'Too many requests made'
  ) {
    super(statusCode, description)
  }
}

module.exports = TooManyRequestsError
