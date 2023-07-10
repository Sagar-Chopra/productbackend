const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.cookie;

    // Parsing the cookie string
    const cookieParts = token.split(";");
    let jwtoken = null;

    // Finding the "jwtoken" value within the cookie parts
    cookieParts.forEach((part) => {
      const trimmedPart = part.trim();
      if (trimmedPart.startsWith("jwtoken=")) {
        jwtoken = trimmedPart.substring("jwtoken=".length);
      }
    });
    const verifyToken = jwt.verify(jwtoken, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": jwtoken,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (e) {
    res.status(401).send("unauthrised : NO token provided");
    console.log(e);
  }
};

module.exports = Authenticate;
