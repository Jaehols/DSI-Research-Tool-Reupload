const client = require('../http/client');
const parser = require('../parser/parser');
const TooManyRequestsError = require('../errors/tooManyRequestsError');
const InvalidInputError = require('../errors/invalidInputError');
const InternalServerError = require('../errors/internalServerError');

const getSearch = async (req) => {
  try {
    const searchTerm = req.query['search-term'];
    const date = req.query['date'];
    const country = req.query['country'];
    if (searchTerm == null) {
      throw new InvalidInputError();
    }

    let searchQuery = `${searchTerm}`;

    if (country != null) {
      searchQuery = searchQuery + `+AND+AFFILCOUNTRY(${country})`;
    }

    let apiCall = `/search/scopus?query=${searchQuery}&sort=citedby-count&view=COMPLETE`;

    if (date != null) {
      apiCall = apiCall + `&date=${date}`;
    }

    const response = await client.get(apiCall);
    return response;
  } catch (err) {
    if (err.response.status == 429) {
      throw new TooManyRequestsError();
    } else {
      throw new InternalServerError();
    }
  }
};

const parseSearch = async (response, country) => {
  const generatedResponse = parser.parseResponse(response, country);
  return generatedResponse;
};

const search = async (req, res, next) => {
  try {
    const country = req.query['country'];
    const response = await getSearch(req);
    const search = await parseSearch(response.data, country);
    res.status(200);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(search);
  } catch (err) {
    next(err);
  }
};

module.exports = search;
