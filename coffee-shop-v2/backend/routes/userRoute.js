import express from "express";
import {
    loginUser,
    registerUser,
    listUsers,
    removeUser,
    resetPassword,
    fetchUserData, updateData, editData
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router()

userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
userRouter.get('/list', listUsers);
userRouter.post("/remove", removeUser);
userRouter.post("/reset", resetPassword);
userRouter.post('/userdata', authMiddleware, fetchUserData);
userRouter.post('/update', authMiddleware, updateData);
userRouter.post('/edit', editData);
userRouter.post('/fetch', fetchUserData);


export default userRouter;