const httpStatusCodes = require('../http/httpStatusCodes');
const BaseError = require('./baseError');

class ArticleNotFoundError extends BaseError {
  constructor(
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Article not found'
  ) {
    super(statusCode, description);
  }
}

module.exports = ArticleNotFoundError;
