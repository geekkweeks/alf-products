import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);
userRouter.get("/api/users/find", userController.find);
userRouter.get("/api/users", userController.get);

export { userRouter };
