import express from "express";
import { _config } from "./config/config.js";
import logger from "./utils/logger.js"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import captianRoute from "./routes/captianRoute.js";
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
app.use("/", captianRoute);




app.listen(_config.PORT, () => {
  logger.info(`captian service is running on port ${_config.PORT}`);
 

});

//unhandle rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  throw reason;
});

export default app;

