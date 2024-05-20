import express from 'express';
import { forgotPassword, loginUser, registerUser, resetPassword, profile, profileUpdate } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get("/profile", profile);
userRouter.patch("/profile/:token", profileUpdate);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);

export default userRouter;