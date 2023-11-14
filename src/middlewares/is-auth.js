const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = "";
  if (!!req.get("Authorization")) {
    token = req.get("Authorization").split(" ")[1];
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    err.statusCode = 500;
    res.status(500).json({
      error: "Not authenticated.",
    });
  }

  console.log("Decoded Token is: ", decodedToken);
  console.log("Token is: " + token);

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  next();
};

