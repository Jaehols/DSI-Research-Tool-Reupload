const Search = require("../models/search");

const updateSearch = async (req, res) => {
  
  try {

    const id = req.params.id;
    const name = req.query['name'];

    await Search.findByIdAndUpdate(id,{"name": name});

    res.status(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: "Entry name updated." });

  } catch(err) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400);
    res.send({ status: "Search could not be updated" });

  }
};

module.exports = updateSearch;
