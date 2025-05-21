import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config.js'


// login user
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials." });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Internal server error" });
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, "random#secret");
}

// register user
const registerUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const exists = await userModel.findOne({email});

        if (exists) {
            return res.json({success: false, message: "User already exists."});
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email."});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters."});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token});
    }catch(err) {
        console.log(err);
        res.json({success: false, message: "Internal server error"});
    }
}

export {loginUser, registerUser};