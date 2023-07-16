class Author {
  constructor(
    name,
    profile,
    institution,
    articleCount,
    citationCount,
    citedByCount,
    subjectAreas,
    publicationRange
  ) {
    this.name = name;
    this.profile = profile;
    this.institution = institution;
    this.articleCount = articleCount;
    this.citationCount = citationCount;
    this.citedByCount = citedByCount;
    this.subjectAreas = subjectAreas;
    this.publicationRange = publicationRange;
  }
}

module.exports = Author;
