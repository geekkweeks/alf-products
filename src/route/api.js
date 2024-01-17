import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();

// register auth middleware (will be processed before going to controller). Should be sequece for registration
userRouter.use(authMiddleware);
userRouter.get("/api/users/find", userController.find);
userRouter.get("/api/users", userController.get);

userRouter
  .route("/users")
  .get((req, res) => {
    res.send("get users");
  })
  .post((req, res) => {
    res.send("Create new user users");
  });
export { userRouter };
