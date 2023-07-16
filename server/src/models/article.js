class Article {
  constructor(
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
  ) {
    this.name = name;
    this.link = link;
    this.abstract = abstract;
    this.aggregationType = aggregationType;
    this.publicationName = publicationName;
    this.publisher = publisher;
    this.volume = volume;
    this.issue = issue;
    this.pageRange = pageRange;
    this.coverDate = coverDate;
    this.citedByCount = citedByCount;
    this.author = [];
    this.institution = [];
  }

  addAuthor(author) {
    this.author.push(author);
  }

  addInstitution(institution) {
    this.institution.push(institution);
  }
}

module.exports = Article;
