import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import { credentials } from "./middleware/credential-middleware.js";
import corsOptions from "./config/cors-options.js";
import cors from "cors";


console.log("passed CORS");

web.listen(process.env.PORT, () => {
  logger.info(`App running on port ${process.env.PORT}`);
});
