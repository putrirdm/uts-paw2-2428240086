module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: 400,
      message: "Format JSON tidak valid",
      data: null
    });
  }

  console.error(err);
  res.status(500).json({
    status: 500,
    message: "Terjadi kesalahan pada server",
    data: null
  });
};