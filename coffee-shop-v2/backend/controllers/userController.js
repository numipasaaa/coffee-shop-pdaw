import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config.js';


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

// listing all orders for admin panel
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({success: true, data: users});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at listUsers"});
    }
}

// remove food item
const removeUser = async (req, res) => {
    const userId = req.body.id;

    try {
        const user = await userModel.findById(userId);
        if (user) {
            await userModel.findByIdAndDelete(userId);
            res.json({success: true, message: "User removed successfully."});
        } else {
            res.json({success: false, message: "User not found."});
        }
    } catch (err) {
        console.log(err);
        res.json({success: false, message: "Failed to remove user."});
    }
}

// api for updating order status
const resetPassword = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters."});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // update password
        await userModel.findOneAndUpdate({ email: email }, {password: hashedPassword});

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error at reset" });
    }
}

const fetchUserData = async (req, res) => {
    const userId = req.body.userId;
    try {
        const userData = await userModel.findById(userId);
        res.json({success: true, data: userData});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at fetching user data"});
    }
}

const updateData = async (req, res) => {
    const email = req.body.data.email;
    const password = req.body.data.password;
    const name = req.body.data.name;
    const userId = req.body.userId;

    try{
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email."});
        }

        if (password === "") {
            await userModel.findByIdAndUpdate(userId, {email: email, name: name});
        }
        else {
            if (password.length < 8) {
                return res.json({success: false, message: "Password must be at least 8 characters."});
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // update password
            await userModel.findByIdAndUpdate(userId, {email: email, password: hashedPassword, name: name});
        }

        res.json({success: true, message: "User updated successfully."});
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error at update" });
    }
}

const editData = async (req, res) => {
    const email = req.body.data.email;
    const password = req.body.data.password;
    const name = req.body.data.name;
    const userId = req.body.data._id;

    try{
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email."});
        }

        if (password === "") {
            await userModel.findByIdAndUpdate(userId, {email: email, name: name});
        }
        else {
            if (password.length < 8) {
                return res.json({success: false, message: "Password must be at least 8 characters."});
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // update password
            await userModel.findByIdAndUpdate(userId, {email: email, password: hashedPassword, name: name});
        }

        res.json({success: true, message: "User updated successfully."});
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error at update" });
    }
}


export {loginUser, registerUser, listUsers, removeUser, resetPassword, fetchUserData, updateData, editData};