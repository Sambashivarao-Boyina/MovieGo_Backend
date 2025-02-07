module.exports = (req, res, next) => {
  if (req.user !== null && req.user.type !== "User") {
    return res.status(401).json({ message: "You are not User" });
  }
  next();
};
