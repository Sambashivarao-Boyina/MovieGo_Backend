const Admin = require("../../Models/admin");
const ExpressError = require("../../Utils/ExpressError");
const bcrypt = require("bcryptjs");



module.exports.getAdminDetails = async (req, res, next) => {
    const admin = await Admin.findById(req.user.id).select("-password");

    res.status(200).json(admin);
}

module.exports.changePhoneNumber = async (req, res, next) => {
    const phoneNumber = req.body.data;
    const admin = await Admin.findById(req.user.id);

    if (!(/^[0-9]{10}$/.test(phoneNumber))) {
        throw new ExpressError(401, "Invalid phone number")
    }

    admin.phone = phoneNumber;

    const savedAdmin = await admin.save();
    const { password, ...adminWithoutPassword } = savedAdmin.toObject();

    res.status(200).json(adminWithoutPassword);

}

module.exports.changePassword = async (req, res, next) => {
    const newPassword = req.body.data;
    const admin = await Admin.findById(req.user.id);

    if (!(newPassword && newPassword.trim().length >= 6)) {
        throw new ExpressError(401,"Password should atleast 6 chars");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword

    await admin.save();

    res.status(200).json({ message: "Password Updated" });
}