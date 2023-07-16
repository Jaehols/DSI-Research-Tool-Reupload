const InstitutionNotFoundError = require('../errors/institutionNotFoundError');
const Institution = require('../models/institution');

const findName = (institutionResponse, next) => {
  return institutionResponse['affiliation-name'];
};

const findProfile = (institutionResponse, next) => {
  return institutionResponse['institution-profile']['org-URL'];
};

const findAuthorCount = (institutionResponse, next) => {
  return institutionResponse['coredata']['author-count'];
};

const findDocumentCount = (institutionResponse, next) => {
  return institutionResponse['coredata']['document-count'];
};

const findCountry = (institutionResponse, next) => {
  return institutionResponse['country'];
};

const findCity = (institutionResponse, next) => {
  return institutionResponse['city'];
};

module.exports.parseResponse = (response, next) => {
  const institutionResponse = response['affiliation-retrieval-response'];
  if (institutionResponse == null) {
    next(new InstitutionNotFoundError());
  }

  const name = findName(institutionResponse, next);
  const profile = findProfile(institutionResponse, next);
  const authorCount = findAuthorCount(institutionResponse, next);
  const documentCount = findDocumentCount(institutionResponse, next);
  const country = findCountry(institutionResponse, next);
  const city = findCity(institutionResponse, next);

  const institution = new Institution(
    name,
    profile,
    authorCount,
    documentCount,
    country,
    city
  );
  return institution;
};
