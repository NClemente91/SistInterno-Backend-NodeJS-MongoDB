const response = require("../network/response");

const errorPage = (req, res) => {
  return response.error(req, res, "Not Found", 404);
};

module.exports = { errorPage };
