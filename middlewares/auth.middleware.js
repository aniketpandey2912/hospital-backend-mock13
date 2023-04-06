const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token = req.headers.Authorization;

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
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
