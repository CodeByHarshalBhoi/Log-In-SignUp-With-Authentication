const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const secretekey = "harshal";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const verifyToken = jwt.verify(token, secretekey);
    console.log(verifyToken);
    const rootUser = await User.findOne({ _id: verifyToken._id });
    console.log(rootUser);
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "unauthorized user" });
  }
};

module.exports = authenticate;
