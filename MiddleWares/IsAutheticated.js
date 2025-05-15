const jwt = require("jsonwebtoken");
const util = require("util");

const verifyToken = util.promisify(jwt.verify); // Converts callback-based to promise-based

module.exports = async (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not login" });
  }

  const token = headers.split(" ")[1];

  try {
    const decoded = await verifyToken(token, process.env.SECREAT_KEY); 

    req.user = {
      id: decoded.id,
      type: decoded.type,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "You are not login"});
  }
};
