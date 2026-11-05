module.exports = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      status: 401,
      message: "API key tidak valid atau tidak diberikan",
      data: null
    });
  }

  next();
};