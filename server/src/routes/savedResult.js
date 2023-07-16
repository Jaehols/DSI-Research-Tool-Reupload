const Search = require("../models/search");

const savedResult = async (req, res) => {
  
  try {
    const id = req.params.id;

    const result = await Search.findById(id);

    res.status(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(result);
  
  } catch(err) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400);
    res.send({ status: "Search could not be found" });

  }
};

module.exports = savedResult;
