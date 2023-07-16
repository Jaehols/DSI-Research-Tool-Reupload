const Search = require("../models/search");

const deleteSearch = async (req, res) => {
  try{
    
    const id = req.params.id;

    await Search.findByIdAndDelete(id);

    res.status(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: "Entry deleted" });
  
  } catch(err) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(400);
    res.send({ status: "Search could not be found" });

  }
  
};

module.exports = deleteSearch;
