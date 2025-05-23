const Admin = require("../../Models/admin")
const ExpressError = require("../../Utils/ExpressError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.adminSignUp = async (req, res, next) => {
    
    const adminData = req.body;

    let adminExist = await Admin.findOne({ email: adminData.email });
    if (adminExist) {
        return res.status(409).json({ message:"Email Already exist"});
    }

    adminExist = await Admin.findOne({ name: adminData.name });
    if (adminExist) {
        return res.status(409).json({ message: "Name already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const newAdmin = new Admin({ ...adminData, password: hashedPassword });

    const savedUser = await newAdmin.save();

    const token = jwt.sign(
        { id: savedUser._id, type: "Admin" },
        process.env.SECREAT_KEY,
        {
            expiresIn: "7d",
        }
    );

    res.status(201).json({ message: "Successfully Registered", token: token });
};


module.exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        return res.status(401).json({message:"Email doesn't exist"});
    } 
    

    // const isCorrect = await bycrypt.compare(password, admin.password);
     const isCorrect = await bcrypt.compare(password, admin.password);
   
    
    if (!isCorrect) {
        return res.status(401).json({ message: "Password doest match" });
    }

    const token = jwt.sign({ id: admin._id, type: "Admin" }, process.env.SECREAT_KEY, { expiresIn: "7d" });
   

    res.status(200).json({ message: "Login Successfull" ,token:token});
}

module.exports.adminRefreshToken = async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id, type: "Admin" }, process.env.SECREAT_KEY, { expiresIn: "7d" });

    res.status(200).json({ message: "Token is verified", token: token });
}