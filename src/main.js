import { web } from "./application/web.js";
import cors from "cors";
import { logger } from "./application/logging.js";

web.listen(process.env.PORT, () => {
  logger.info(`App running on port ${process.env.PORT}`);
});
