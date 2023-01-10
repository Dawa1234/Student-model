const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  if (!req.headers.authorization) {
    let err = new Error("Authorization token missing");
    return next(err);
  }
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return next(err);
    req.user = decoded;
    next();
  });
};

module.exports = { verifyUser };
