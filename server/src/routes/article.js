const client = require('../http/client');
const parser = require('../parser/articleParser');
const TooManyRequestsError = require('../errors/tooManyRequestsError');
const InvalidInputError = require('../errors/invalidInputError');
const InternalServerError = require('../errors/internalServerError');

const getArticle = async (req, next) => {
  try {
    const articleId = req.params.id;
    if (articleId == null) {
      next(new InvalidInputError());
    }

    const apiCall = `/abstract/scopus_id/${articleId}`;
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

const parseArticle = async (response, next) => {
  const generatedResponse = parser.parseResponse(response, next);
  return generatedResponse;
};

const article = async (req, res, next) => {
  const response = await getArticle(req, next);
  const article = await parseArticle(response.data, next);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200);
  res.send(article);
};

module.exports = article;
