const errorPage = (req, res) => {
  return res.status(404).json({
    code: "ERR",
    message: "Not Found",
    success: false,
    data: null,
  });
};

module.exports = { errorPage };
