import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

export const web = express();
web.use(express.json());

//#region public router
web.use(publicRouter);
//#endregion

//#region auth router
web.use(userRouter);
//#endregion

web.use(errorMiddleware);
