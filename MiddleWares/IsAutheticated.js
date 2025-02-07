const jwt = require("jsonwebtoken");


module.exports  = async (req, res, next) => {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        return res.status(401).json({ message: "You are not login" });
    }

    const tokenFound = headers.split(" ")[1];
   
    let id;
    let type;

    jwt.verify(tokenFound, process.env.SECREAT_KEY, async (error, data) => {
        if (error) {
            return res.status(401).json({message:"You are not login"})
        }
        id = data.id;
        type = data.type;
    })

    if (id === null) {
        return res.status(401).json({ message: "You are not login", isSuccess: false });
    }
    req.user = {
       id: id,
       type: type,
    };

    next();
    
}