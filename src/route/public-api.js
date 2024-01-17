import express from "express";
import userController from "../controller/user-controller.js";
import { credentials } from "../middleware/credential-middleware.js";

const publicRouter = new express.Router();

publicRouter.use(credentials);
publicRouter.post("/api/users/register", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
