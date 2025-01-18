import express from "express";
import { _config } from "./config/config.js";
import logger from "./utils/logger.js"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import captianRoute from "./routes/captianRoute.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan('combined')); 

//routes
app.use("/", captianRoute);




app.listen(_config.PORT, () => {
  logger.info(`captian service is running on port ${_config.PORT}`);
  logger.info(`redis is running on port ${_config.REDIS_URL}`);

});

//unhandle rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  throw reason;
});

export default app;

