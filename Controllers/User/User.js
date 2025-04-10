const User = require("../../Models/user");
const ExpressError = require("../../Utils/ExpressError");
const bcrypt = require("bcryptjs");


module.exports.getuserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
}

module.exports.changePhoneNumber = async (req, res, next) => {
    const phoneNumber = req.body.data;
    const user = await User.findById(req.user.id);

    if (!(/^[0-9]{10}$/.test(phoneNumber))) {
        throw new ExpressError(401, "Invalid phone number")
    }

    user.phone = phoneNumber;

    const saveduser = await user.save();
    const { password, ...userWithoutPassword } = saveduser.toObject();

    res.status(200).json(userWithoutPassword);

}

module.exports.changePassword = async (req, res, next) => {
    const newPassword = req.body.data;
    const user = await User.findById(req.user.id);
   

    if (!(newPassword && newPassword.trim().length >= 6)) {
        throw new ExpressError(401,"Password should atleast 6 chars");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword

    // await user.save();

    res.status(200).json({ message: "Password Updated" });
}