const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function isAuthenticated(req, res, next) {
  const token = req.param.token;
  if (!token) {
    return res.status(401).json({ msg: "Not Authenticated" });
  } else {
    const tokenDecoded = jwt.verify(token, "dddasdfdas");
    const userId = tokenDecoded.userId;
    const foundUser = await User.dindById(userId);
    if (!foundUser) {
      return res.status(401).json({ msg: "Token not valid" });
    } else {
      next();
    }
  }
}

async function isAdmin(req, res, next) {
  if (!token) {
    return res.status(401).json({ msg: "Not Authenticated" });
  } else {
    const tokenDecoded = jwt.verify(token, "dddasdfdas");
    const userId = tokenDecoded.userId;
    const foundUser = await User.dindById(userId);
    if (!foundUser) {
      return res.status(401).json({ msg: "Token not valid" });
    } else {
      if (foundUser.role !== "admin") {
        return res.status(403).json({ msg: "Not Authorized" });
      } else {
        next();
      }
    }
  }
}

module.exports = { isAuthenticated, isAdmin }