import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorhandler.js";
import { _config } from "./config/config.js";
import expressProxy from "express-http-proxy";

const app = express();
const PORT = _config.PORT ?? 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); 

//proxy routes

//user service
app.use("/api/v1/user" , expressProxy(_config.USER_SERVICE_URL));

//captian service
app.use("/api/v1/captian" , expressProxy(_config.CAPTIAN_SERVICE_URL));

//ride service
app.use("/api/v1/ride" , expressProxy(_config.RIDE_SERVICE_URL));









app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`API Gateway is running on port ${PORT}`);
  logger.info(`User Service is running on port ${_config.USER_SERVICE_URL}`);
  logger.info(`Captian Service is running on port ${_config.CAPTIAN_SERVICE_URL}`);
  logger.info(`Ride Service is running on port ${_config.RIDE_SERVICE_URL}`);
  logger.info(`Redis is running on port ${_config.REDIS_URL}`);
});

//unhandle rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  throw reason;
});

export default app;
