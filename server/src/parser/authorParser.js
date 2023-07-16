const AuthorNotFoundError = require('../errors/authorNotFoundError');
const Author = require('../models/author');
const PublicationRange = require('../models/publicationRange');

const findName = (foundAuthor, next) => {
  const authorNameType = foundAuthor['author-profile']['preferred-name'];
  const authorName =
    authorNameType['given-name'] + ' ' + authorNameType['surname'];
  return authorName;
};

const findInstitution = (foundAuthor, next) => {
  const institution =
    foundAuthor['author-profile']['affiliation-current']['affiliation'][
      'ip-doc'
    ]['afdispname'];
  return institution;
};

const findArticleCount = (foundAuthor, next) => {
  const articleCount = foundAuthor['coredata']['document-count'];
  return articleCount;
};

const findCitationCount = (foundAuthor, next) => {
  const citationCount = foundAuthor['coredata']['citation-count'];
  return citationCount;
};

const findCitedByCount = (foundAuthor, next) => {
  const citedByCount = foundAuthor['coredata']['cited-by-count'];
  return citedByCount;
};

const findPublicationRange = (foundAuthor, next) => {
  const publicationStart =
    foundAuthor['author-profile']['publication-range']['@start'];
  const publicationEnd =
    foundAuthor['author-profile']['publication-range']['@end'];

  const publicationRange = new PublicationRange(
    publicationStart,
    publicationEnd
  );
  return publicationRange;
};

const findProfile = (foundAuthor, next) => {
  const links = foundAuthor['coredata']['link'];
  let profile = null;
  links.every((link) => {
    const rel = link['@rel'];
    if (rel == 'scopus-author') {
      profile = link['@href'];
      return false;
    }
    return true;
  });
  return profile;
};

const findAndParseSubjectAreas = (foundAuthor, next) => {
  const subjectAreasInResponse = foundAuthor['subject-areas']['subject-area'];
  const subjectAreas = [];
  subjectAreasInResponse.forEach((subjectArea) => {
    subjectAreas.push(subjectArea['$']);
  });
  return subjectAreas;
};

module.exports.parseResponse = (response, next) => {
  const authorResponse = response['author-retrieval-response'];
  if (authorResponse == null) {
    next(new AuthorNotFoundError());
  }
  const foundAuthor = authorResponse[0];

  const name = findName(foundAuthor, next);
  const profile = findProfile(foundAuthor, next);
  const institution = findInstitution(foundAuthor, next);
  const articleCount = findArticleCount(foundAuthor, next);
  const citationCount = findCitationCount(foundAuthor, next);
  const citedByCount = findCitedByCount(foundAuthor, next);

  const publicationRange = findPublicationRange(foundAuthor, next);
  const subjectAreas = findAndParseSubjectAreas(foundAuthor, next);
  const author = new Author(
    name,
    profile,
    institution,
    articleCount,
    citationCount,
    citedByCount,
    subjectAreas,
    publicationRange
  );
  return author;
};
