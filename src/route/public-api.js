import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import fileController from "../controller/file-controller.js";
import { credentials } from "../middleware/credential-middleware.js";
import { uploadStorage } from "../config/upload-config.js";

const publicRouter = new express.Router();

publicRouter.use(credentials);
publicRouter.post("/api/users/register", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.get("/api/users/isexist", userController.isUserExist);

publicRouter.post("/api/products", productController.add);

publicRouter.post(
  "/api/files",
  uploadStorage.single("prod_image"),
  fileController.upload
);

export { publicRouter };
