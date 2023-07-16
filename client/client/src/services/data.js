/*
This file exists as a centralised datastore for all front end information
This has been implemented through Pinia (see readme for more details)

Separate data stores exist for the 4 main data sets
- Graph
- Author info
- Article info
- Institution info

Local functions for these datastores exist within their definitions to manipulate the data

Yes this is a very long file but good to keep the store functionality centralised

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
*/

import { defineStore } from "pinia";

// This is the store for holding the graph data and thus is most complex
// chart is the name of the store. It is unique across your application
// and will appear in devtools
export const useChartStore = defineStore("chart", {
  // Define the state of the store and default values
  state: () => ({
    isEmpty: true,
    topPercentageToShow: 100,
    minConnections: 0,
    searchQuery: null,
    searchLocation: null,
    article: {
      categories: [
        {
          name: null,
        },
      ],
      nodes: [
        {
          name: null,
          id: null,
          value: 0,
          symbolSize: 0,
          category: 0,
        },
      ],
      links: [
        {
          source: 0,
          target: 0,
        },
      ],
    },
    author: {
      categories: [
        {
          name: null,
        },
      ],
      nodes: [
        {
          name: null,
          id: null,
          value: 0,
          symbolSize: 0,
          category: 0,
        },
      ],
      links: [
        {
          source: 0,
          target: 0,
        },
      ],
    },
    institution: {
      categories: [
        {
          name: null,
        },
      ],
      nodes: [
        {
          name: null,
          id: null,
          value: 0,
          symbolSize: 0,
          category: 0,
        },
      ],
      links: [
        {
          source: 0,
          target: 0,
        },
      ],
    },
    currNode: null,
    currView: "Authors",
  }),

  // Set of functions for this datastore
  actions: {
    // Calculate and return the number of nodes for a given view
    numNodes() {
      switch (this.currView) {
        case "Articles":
          return this.article.nodes.length;
        case "Authors":
          return this.author.nodes.length;
        case "Institutions":
          return this.institution.nodes.length;
        default:
          // invalid opt
          break;
      }
      return null;
    },

    // Calculate and return the number of links for a given view
    numLinks() {
      switch (this.currView) {
        case "Articles":
          return this.article.links.length;
        case "Authors":
          return this.author.links.length;
        case "Institutions":
          return this.institution.links.length;
        default:
          // invalid opt
          break;
      }
      return null;
    },

    // return a graph based on store state(currNode and currView)
    getGraph() {
      // If a current node is selected a subgraph will have to be created
      if (this.currNode != null) {
        // return subGraph
        let allLinks;
        let allNodes;
        let allCat;

        // set up for different views
        switch (this.currView) {
          case "Articles":
            allLinks = JSON.parse(JSON.stringify(this.article.links));
            allNodes = JSON.parse(JSON.stringify(this.article.nodes));
            allCat = JSON.parse(JSON.stringify(this.article.categories));
            break;
          case "Authors":
            allLinks = JSON.parse(JSON.stringify(this.author.links));
            allNodes = JSON.parse(JSON.stringify(this.author.nodes));
            allCat = JSON.parse(JSON.stringify(this.author.categories));
            break;
          case "Institutions":
            allLinks = JSON.parse(JSON.stringify(this.institution.links));
            allNodes = JSON.parse(JSON.stringify(this.institution.nodes));
            allCat = JSON.parse(JSON.stringify(this.institution.categories));
            break;
        }

        // find all related links
        let tempLinks = allLinks.filter((item) => {
          return item.target === this.currNode || item.source === this.currNode;
        });
        if (tempLinks.length == 0) {
          // current node don't have any links
          let currN = allNodes.at(this.currNode);
          return {
            series: [
              {
                data: [currN],
                links: [],
                categories: [allCat.at(currN.category)],
              },
            ],
            legend: [
              {
                categories: [allCat.at(currN.category)],
              },
            ],
          };
        }
        let box = [];
        tempLinks.forEach((e) => {
          box.push(e.source);
          box.push(e.target);
        });

        let nodeBuff = allNodes.map((element, index) => ({
          ...element,
          oldIndex: index,
        }));

        let tempNodes = nodeBuff.filter((element, index) => {
          return box.indexOf(index) > -1;
        });

        let cat = [];
        tempNodes.forEach((e) => {
          let catIndex = cat.indexOf(allCat[e.category]);
          if (catIndex <= -1) {
            // new category
            cat.push(allCat[e.category]);
            e.category = cat.length - 1;
            // tempColor.push(constColor[e.category]) // need to access current color suit
          } else {
            // catergory exist
            e.category = catIndex;
          }
        });

        // update links
        tempLinks.forEach((e) => {
          // update value of source
          e.source = tempNodes.findIndex(
            (element) => element.oldIndex == e.source
          );

          // update value of target
          e.target = tempNodes.findIndex(
            (element) => element.oldIndex == e.target
          );
        });

        // update state
        return {
          series: [
            {
              data: tempNodes,
              links: tempLinks,
              categories: cat,
            },
          ],
          legend: [
            {
              categories: cat,
            },
          ],
        };

        // In the case that there is no node selected the main graph view will be created
      } else {
        // return mainGraph
        // All main graph data is parsed for formatting
        switch (this.currView) {
          case "Articles":
            return this.dataformatter(
              this.topPercentageToShow,
              this.minConnections,
              this.article.nodes,
              this.article.links,
              this.article.categories
            );

          case "Authors":
            return this.dataformatter(
              this.topPercentageToShow,
              this.minConnections,
              this.author.nodes,
              this.author.links,
              this.author.categories
            );
          case "Institutions":
            return this.dataformatter(
              this.topPercentageToShow,
              this.minConnections,
              this.institution.nodes,
              this.institution.links,
              this.institution.categories
            );
          default:
            // invalid option
            return null;
        }
      }
    },

    // This acts as the default search response importing response data into the relevant sections of the store
    defaultSearch(searchResponse) {
      this.article = searchResponse.article;
      this.author = searchResponse.author;
      this.institution = searchResponse.institution;
    },

    // Utilised by the data formatter to parse the nodes by the filter parameters
    nodePercentageParser(topPercent, minConnections, nodeArray) {
      let finalNodes = [];
      const numToDisplay = Math.ceil(nodeArray.length * (topPercent / 100));
      let tempNodes = nodeArray.slice(0, numToDisplay);

      for (let index = 0; index < tempNodes.length; index++) {
        if (tempNodes[index].value >= minConnections) {
          tempNodes[index]["originalIndex"] = index;

          finalNodes.push(tempNodes[index]);
        }
      }
      return finalNodes;
    },

    // Data formatter allows the graph to dynamicall apply the filtering in a centralised function
    dataformatter(
      topPercentageToShow,
      minConnections,
      nodeArray,
      linkArray,
      catArry
    ) {
      // Firstly parse the relevant nodes
      const parsedNodes = this.nodePercentageParser(
        topPercentageToShow,
        minConnections,
        nodeArray
      );

      // Apply the correct categories
      let parsedCategories = [];
      for (let index = 0; index < parsedNodes.length; index++) {
        const element = parsedNodes[index];
        if (!parsedCategories.includes(catArry[element.category])) {
          parsedCategories.push(catArry[element.category]);
          parsedNodes[index].category = parsedCategories.length - 1;
        }
      }

      // Set the correct node links
      const tempLinksArray = JSON.parse(JSON.stringify(linkArray));

      let parsedLinks = [];
      for (let index = 0; index < tempLinksArray.length; index++) {
        let link = tempLinksArray[index];
        let newSource = false;
        let newTarget = false;
        for (let index = 0; index < parsedNodes.length; index++) {
          const node = parsedNodes[index];
          if (node.originalIndex == link.source) {
            link.source = index;
            newSource = true;
          }
          if (node.originalIndex == link.target) {
            link.target = index;
            newTarget = true;
          }
        }
        if (newSource && newTarget) {
          parsedLinks.push(link);
        }
      }

      // Return full dataset for the graph
      return {
        series: [
          {
            data: parsedNodes,
            links: parsedLinks,
            categories: parsedCategories,
          },
        ],
        legend: [
          {
            type: "scroll",
            top: 0,
            categories: parsedCategories,
          },
        ],
      };
    },
  },
});

// This is the store for holding the author data
// author is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuthorStore = defineStore("author", {
  state: () => ({
    isEmpty: true,
    name: null,
    profile: null,
    institution: null,
    articleCount: null,
    citationCount: null,
    citedByCount: null,
    subjectAreas: [],
    publicationRange: {
      start: null,
      end: null,
    },
  }),

  // Only functionality is to read in an author response and set the relevant store fields
  actions: {
    getAuthorResults(authorResponse) {
      this.isEmpty = false;
      this.name = authorResponse.name;
      this.profile = authorResponse.profile;
      this.institution = authorResponse.institution;
      this.articleCount = authorResponse.articleCount;
      this.citationCount = authorResponse.citationCount;
      this.citedByCount = authorResponse.citedByCount;
      this.subjectAreas = authorResponse.subjectAreas;
      this.publicationRange = authorResponse.publicationRange;
      this.profile = authorResponse.profile;
    },
  },
});

// This is the store for holding the article data
// article is the name of the store. It is unique across your application
// and will appear in devtools
export const useArticleStore = defineStore("article", {
  state: () => ({
    isEmpty: true,
    name: null,
    link: null,
    abstract: null,
    aggregationType: null,
    publicationName: null,
    publisher: null,
    volume: null,
    issue: null,
    pageRange: null,
    coverDate: null,
    citedByCount: null,
    author: [],
    institution: [],
  }),

  // Only functionality is to read in an article response and set the relevant store fields
  actions: {
    getArticleResults(articleResponse) {
      this.name = articleResponse.name;
      this.link = articleResponse.link;
      this.abstract = articleResponse.abstract;
      this.aggregationType = articleResponse.aggregationType;
      this.publicationName = articleResponse.publicationName;
      this.publisher = articleResponse.publisher;
      this.volume = articleResponse.volume;
      this.issue = articleResponse.issue;
      this.pageRange = articleResponse.pageRange;
      this.coverDate = articleResponse.coverDate;
      this.citedByCount = articleResponse.citedByCount;
      this.author = articleResponse.author;
      this.institution = articleResponse.institution;
      this.isEmpty = false;
    },
  },
});

// This is the store for holding the institution data
// institution is the name of the store. It is unique across your application
// and will appear in devtools
export const useInstitutionStore = defineStore("institution", {
  state: () => ({
    isEmpty: true,
    name: null,
    profile: null,
    authorCount: 0,
    documentCount: 0,
    country: null,
    city: null,
  }),

  // Only functionality is to read in an institution response and set the relevant store fields
  actions: {
    getInsitutionResults(institutionResponse) {
      this.isEmpty = false;
      this.name = institutionResponse.name;
      this.profile = institutionResponse.profile;
      this.authorCount = institutionResponse.authorCount;
      this.documentCount = institutionResponse.documentCount;
      this.country = institutionResponse.country;
      this.city = institutionResponse.city;
    },
  },
});

// This is the store for holding the saved search data
// savedSearches is the name of the store. It is unique across your application
// and will appear in devtools
export const useSavedSearchStore = defineStore("savedSearches", {
  state: () => ({
    searches: [
      {
        _id: null,
        term: null,
        location: null,
        savedAt: null,
      },
    ],
  }),

  actions: {
    getSavedSearchResults(savedSearchResponse) {
      this.searches = savedSearchResponse;
    },
  },
});
