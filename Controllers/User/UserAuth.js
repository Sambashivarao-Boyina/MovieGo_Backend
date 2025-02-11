const User = require("../../Models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

module.exports.userSignUp = async (req, res, next) => {
    const userData = req.body;
    let userExist = await User.findOne({ email: userData.email });
    if (userExist) {
      return res.status(409).json({ message: "Email Already exist" });
    }

    userExist = await User.findOne({ name: userData.name });
    if (userExist) {
      return res.status(409).json({ message: "Name already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User({ ...userData, password: hashedPassword });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, type: "User" },
      process.env.SECREAT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ message: "Successfully Registered", token: token });
}

module.exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
          return res.status(401).json({ message: "Email doesn't exist" });
    }

    // const isCorrect = await bycrypt.compare(password, admin.password);
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
        return res.status(401).json({ message: "Password doest match" });
    }

    const token = jwt.sign(
        { id: user._id, type: "User" },
        process.env.SECREAT_KEY,
        { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login Successfull", token: token });
}

module.exports.userRefreshToken = async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id, type: "User" }, process.env.SECREAT_KEY, { expiresIn: "7d" });

    res.status(200).json({ message: "Token is verified", token: token });
}