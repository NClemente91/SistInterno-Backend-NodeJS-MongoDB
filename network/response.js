const success = (req, res, message, status, data) => {
  let statusCode = status;

  if (!status) {
    status = 200;
  }

  res.status(statusCode).json({
    code: "OK",
    message,
    success: true,
    data,
  });
};

const error = (req, res, message, status) => {
  console.error("[response error] " + message);

  res.status(status || 500).json({
    code: "ERR",
    message,
    success: false,
    data: null,
  });
};

module.exports = { success, error };
