const client = require('../http/client');
const parser = require('../parser/institutionParser');
const TooManyRequestsError = require('../errors/tooManyRequestsError');
const InvalidInputError = require('../errors/invalidInputError');
const InternalServerError = require('../errors/internalServerError');

const getInstitution = async (req, next) => {
  try {
    const institutionId = req.params.id;
    if (institutionId == null) {
      next(new InvalidInputError());
    }

    const apiCall = `/affiliation/affiliation_id/${institutionId}`;
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

const parseInstitution = async (response, next) => {
  const generatedResponse = parser.parseResponse(response, next);
  return generatedResponse;
};

const institution = async (req, res, next) => {
  const response = await getInstitution(req, next);
  const institution = await parseInstitution(response.data, next);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200);
  res.send(institution);
};

module.exports = institution;
