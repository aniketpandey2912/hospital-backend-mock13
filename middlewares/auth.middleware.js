const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;
        next();
      } else {
        res.send({ mssg: "Please login first" });
      }
    });
  } else {
    res.send({ mssg: "Please login first" });
  }
};

module.exports = {
  authenticate,
};
