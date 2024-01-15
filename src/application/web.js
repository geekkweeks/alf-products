import express from "express";
import cors from "cors";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

export const web = express();

web.use(
  cors({
    origin: "http://localhost:3000",
  })
);
web.use(express.json());

//#region public router
web.use(publicRouter);
//#endregion

//#region auth router
web.use(userRouter);
//#endregion

web.use(errorMiddleware);
