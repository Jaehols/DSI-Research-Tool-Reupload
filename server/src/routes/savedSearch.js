const Search = require("../models/search");

const savedSearches = async (req, res) => {

  try {

  const result = await Search.find({}, { searchData: 0 });

  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(result);

  } catch(err) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400);
    res.send({ status: "Saved searches could not be retreived" });

  }

};

module.exports = savedSearches;
