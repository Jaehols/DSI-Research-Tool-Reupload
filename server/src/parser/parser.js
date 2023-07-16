const Node = require('../models/Node');
const Link = require('../models/Link');
const Category = require('../models/Category');

const generateLinks = (connectedItems) => {
  const links = [];
  let connectedItemsLength = connectedItems.length;

  for (let i = 0; i < connectedItemsLength; i++) {
    for (let j = i + 1; j < connectedItemsLength; j++) {
      const sourceNode = connectedItems[i];
      const destinationNode = connectedItems[j];

      // add neighbour values
      sourceNode.addValue();
      destinationNode.addValue();

      const sourceIndex = sourceNode.getIndex();
      const destinationIndex = destinationNode.getIndex();
      const link = new Link(sourceIndex, destinationIndex);
      links.push(link);
    }
  }
  return links;
};

const getMaxValue = (nodes) => {
  let maxValue = 0;
  nodes.forEach((node) => {
    if (node.getValue() > maxValue) {
      maxValue = node.getValue();
    }
  });
  return maxValue;
};

const calculateSymbolSize = (value, maxValue) => {
  return Math.round((parseInt(value) / parseInt(maxValue)) * 15);
};

const generateSymbolSize = (nodes) => {
  const maxValue = getMaxValue(nodes);
  nodes.forEach((node) => {
    const calculatedSymbolSize = calculateSymbolSize(node.getValue(), maxValue);
    const symbolSize = calculatedSymbolSize >= 2 ? calculatedSymbolSize : 2;
    node.symbolSize = symbolSize;
  });
};

const generateInsitutionResponse = (entries, country = null) => {
  let links = [];
  const nodes = [];
  const categories = [];
  const seen = new Map();
  const institution = new Object();
  let index = 0;

  entries.forEach((entry) => {
    const affliations = entry.affiliation;
    const connectedAffiliations = [];

    if (affliations) {
      affliations.every((affiliation) => {
        const affilname = affiliation.affilname;
        const affilId = affiliation.afid;
        const affilcountry = affiliation['affiliation-country'];
        if (
          country != null &&
          affilcountry.toLowerCase() != country.toLowerCase()
        ) {
          return false;
        }

        let node = null;

        if (seen.has(affilId)) {
          node = seen.get(affilId);
        } else {
          node = new Node(affilname, affilId, index);
          category = new Category(affilname, affilname);
          nodes.push(node);
          categories.push(category);
          seen.set(affilId, node);
          index += 1;
        }

        connectedAffiliations.push(node);
        return true;
      });

      const newLinks = generateLinks(connectedAffiliations);
      links = links.concat(newLinks);
    }
  });

  generateSymbolSize(nodes);

  institution['categories'] = categories;
  institution['nodes'] = nodes;
  institution['links'] = links;
  return institution;
};

const generateAuthorResponse = (entries) => {
  let links = [];
  const nodes = [];
  const categories = [];
  const seen = new Map();
  const author = new Object();

  let index = 0;

  entries.forEach((entry) => {
    const authors = entry.author;
    const connectedAuthors = [];

    if (authors) {
      authors.forEach((author) => {
        const authid = author.authid;
        const authName = author.authname;
        let node = null;

        if (seen.has(authid)) {
          node = seen.get(authid);
        } else {
          node = new Node(authName, authid, index);
          category = new Category(authName, authName);
          nodes.push(node);
          categories.push(category);
          seen.set(authid, node);
          index += 1;
        }

        connectedAuthors.push(node);
      });

      const newLinks = generateLinks(connectedAuthors);
      links = links.concat(newLinks);
    }
  });

  generateSymbolSize(nodes);
  author['categories'] = categories;
  author['nodes'] = nodes;
  author['links'] = links;

  return author;
};

const generateArticleResponse = (entries) => {
  let links = [];
  const nodes = [];
  const categories = [];
  const seen = new Map();
  const connectedArticles = [];

  const article = new Object();

  let index = 0;

  entries.forEach((entry) => {
    const articleName = entry['dc:title'];
    const articleId = entry['dc:identifier'].split('SCOPUS_ID:')[1];
    const authors = entry.author;
    let node = new Node(articleName, articleId, index);
    let category = new Category(articleName, articleName);
    nodes.push(node);
    categories.push(category);

    if (authors) {
      authors.forEach((author) => {
        const authid = author.authid;

        if (seen.has(authid)) {
          linkedNode = seen.get(authid);
          // add neighbour values
          node.addValue();
          linkedNode.addValue();
          const sourceIndex = node.getIndex();
          const destinationIndex = linkedNode.getIndex();
          const link = new Link(sourceIndex, destinationIndex);
          links.push(link);
          connectedArticles.push({ source: node, destination: linkedNode });
        } else {
          seen.set(authid, node);
        }
      });
    }
    index += 1;
  });

  generateSymbolSize(nodes);
  article['categories'] = categories;
  article['nodes'] = nodes;
  article['links'] = links;

  return article;
};

module.exports.parseResponse = (response, country) => {
  const entries = response['search-results'].entry;

  const finalResponse = new Object();
  const institution = generateInsitutionResponse(entries, country);
  const author = generateAuthorResponse(entries);
  const article = generateArticleResponse(entries);

  finalResponse['institution'] = institution;
  finalResponse['author'] = author;
  finalResponse['article'] = article;
  return finalResponse;
};
