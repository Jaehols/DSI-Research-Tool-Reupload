const client = require('../http/client');
const parser = require('../parser/authorParser');
const TooManyRequestsError = require('../errors/tooManyRequestsError');
const InvalidInputError = require('../errors/invalidInputError');
const InternalServerError = require('../errors/internalServerError');

const getAuthor = async (req, next) => {
  try {
    const authorId = req.params.id;
    if (authorId == null) {
      next(new InvalidInputError());
    }

    const apiCall = `/author/author_id/${authorId}`;
    const response = await client.get(apiCall);
    return response;
  } catch (err) {
    if (err.response.status == 429) {
      next(new TooManyRequestsError());
    } else {
      next(new InternalServerError());
    }
  }
};

const parseAuthor = async (response, next) => {
  const generatedResponse = parser.parseResponse(response, next);
  return generatedResponse;
};

const author = async (req, res, next) => {
  const response = await getAuthor(req, next);
  const author = await parseAuthor(response.data, next);
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.status(200);
  res.send(author);
};

module.exports = author;
