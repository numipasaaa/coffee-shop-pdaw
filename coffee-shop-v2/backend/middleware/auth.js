import jwt from 'jsonwebtoken';
import "dotenv/config.js";

const authMiddleware = async (req, res, next) => {
    const token = req.body.token;
    // console.log(req.body);
    if (!token) {
        console.log("No token provided:", req.body);
        return res.json({success: false, message: "Unauthorized"});
    }
    try {
        const token_decode = jwt.verify(token, "random#secret");
        req.body.userId = token_decode.userId;
        next();
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error at auth"});
    }
}

export default authMiddleware;