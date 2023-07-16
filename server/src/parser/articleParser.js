const ArticleNotFoundError = require('../errors/articleNotFoundError');
const Article = require('../models/article');

const findName = (foundArticle, next) => {
  return foundArticle['coredata']['dc:title'];
};

const findLink = (foundArticle, next) => {
  const links = foundArticle['coredata']['link'];
  let profile = null;
  links.every((link) => {
    const rel = link['@rel'];
    if (rel == 'scopus') {
      profile = link['@href'];
      return false;
    }
    return true;
  });
  return profile;
};

const findAbstract = (foundArticle, next) => {
  return foundArticle['coredata']['dc:description'];
};

const findAggregationType = (foundArticle, next) => {
  return foundArticle['coredata']['prism:aggregationType'];
};

const findPublicationName = (foundArticle, next) => {
  return foundArticle['coredata']['prism:publicationName'];
};

const findPublisher = (foundArticle, next) => {
  return foundArticle['coredata']['dc:publisher'];
};

const findVolume = (foundArticle, next) => {
  return foundArticle['coredata']['prism:volume'];
};

const findIssue = (foundArticle, next) => {
  return foundArticle['coredata']['prism:issueIdentifier'];
};

const findPageRange = (foundArticle, next) => {
  return foundArticle['coredata']['prism:pageRange'];
};

const findCoverDate = (foundArticle, next) => {
  return foundArticle['coredata']['prism:coverDate'];
};

const findCitedbyCount = (foundArticle, next) => {
  return foundArticle['coredata']['citedby-count'];
};

const addAuthorsFromFoundArticleToResponse = (foundArticle, article, next) => {
  const authors = foundArticle['authors']['author'];
  authors.forEach((author) => {
    article.addAuthor(author['ce:indexed-name']);
  });
};

const addInstitutionsFromFoundArticleToResponse = (
  foundArticle,
  article,
  next
) => {
  const institutions = foundArticle['affiliation'];
  if (Array.isArray(institutions)) {
    institutions.forEach((institution) => {
      article.addInstitution(institution['affilname']);
    });
  } else {
    article.addInstitution(institutions['affilname']);
  }
};

module.exports.parseResponse = (response, next) => {
  const foundArticle = response['abstracts-retrieval-response'];
  if (foundArticle == null) {
    next(new ArticleNotFoundError());
  }

  const name = findName(foundArticle, next);
  const link = findLink(foundArticle, next);
  const abstract = findAbstract(foundArticle, next);
  const aggregationType = findAggregationType(foundArticle, next);
  const publicationName = findPublicationName(foundArticle, next);
  const publisher = findPublisher(foundArticle, next);
  const volume = findVolume(foundArticle, next);
  const issue = findIssue(foundArticle, next);
  const pageRange = findPageRange(foundArticle, next);
  const coverDate = findCoverDate(foundArticle, next);
  const citedByCount = findCitedbyCount(foundArticle, next);

  const article = new Article(
    name,
    link,
    abstract,
    aggregationType,
    publicationName,
    publisher,
    volume,
    issue,
    pageRange,
    coverDate,
    citedByCount
  );

  addAuthorsFromFoundArticleToResponse(foundArticle, article, next);
  addInstitutionsFromFoundArticleToResponse(foundArticle, article, next);
  return article;
};
