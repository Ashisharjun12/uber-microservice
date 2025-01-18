import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { _config } from "./config/config.js";
import logger from "./utils/logger.js";
import  errorHandler from "./middleware/errorHandler.js";
import UserRoute from "./routes/UserRoute.js";
import accessLogStream from "./utils/morgan.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
  stream: accessLogStream
}));


//routes
app.use("/", UserRoute);




app.use(errorHandler);
app.listen(_config.PORT, () => {
  logger.info(`User service is running on port ${_config.PORT}`);
  logger.info(`Database is running on port ${_config.DATABASE_URI}`);

});


//unhandle rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  throw reason;
});


export default app;
