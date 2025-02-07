module.exports = (req, res, next) => {
    if (req.user !== null && req.user.type !== "Admin") {
        return res.status(401).json({ message: "You are not Admin" });
    }
    next();
}