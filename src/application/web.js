import express from "express";
import cors from "cors";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import allowedOrigins from "../config/allowed-origins.js";
import { credentials } from "../middleware/credential-middleware.js";
import { corsOptions } from "../config/cors-options.js";

export const web = express();

web.use(express.json());

// ref: https://github1s.com/gitdagray/nodejs_jwt_auth
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
web.use(credentials);

// Cross Origin Resource Sharing
web.use(cors(corsOptions));

//#region public router
web.use(publicRouter);
//#endregion

//#region auth router
web.use(userRouter);
//#endregion

web.use(errorMiddleware);
