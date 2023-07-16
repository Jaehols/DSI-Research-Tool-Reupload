const Search = require("../models/search");

const store = async (req, res) => {
  try {
    const term = req.query["search-term"];
    const data = req.body;

    const result = await Search.create({
      name: term,
      term: term,
      searchData: data,
    });

    res.status(201);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: "Search saved." });
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400);
    res.send({ status: "Search NOT saved." });
  }
};

module.exports = store;
