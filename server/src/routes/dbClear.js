const Search = require("../models/search");

const dbClear = async (req, res) => {

  await Search.deleteMany({});

  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ status: "All saved searches deleted." });
};

module.exports = dbClear;
