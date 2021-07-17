const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check token exits or not
  if (!token) {
    return res.status(401).json({ msg: "No token, authoriztaion denied" });
  }

  //Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jsontoken"));
    req.user = decoded.users;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
