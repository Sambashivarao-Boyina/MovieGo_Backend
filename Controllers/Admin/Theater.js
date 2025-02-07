const Admin = require("../../Models/admin");
const Theater = require("../../Models/theater");


module.exports.createNewTheater = async (req, res, next) => {
    const theater = req.body;

    const admin = await Admin.findById(req.user.id);

    const newTheater = new Theater(theater);
    newTheater.admin = req.user.id;

    const savedTheater = await newTheater.save();
    admin.theaters.push(savedTheater._id);
    
    await admin.save();

    res.status(200).json({ message: "Successfully created Theater" });
}

module.exports.getAllTheatersOfAdmin = async (req, res, next) => {
    const theaters = await Theater.find({ admin: req.user.id });

    res.status(200).json(theaters);
}