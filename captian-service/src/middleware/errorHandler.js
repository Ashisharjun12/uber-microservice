
import logger from "../utils/logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error(error.stack);
  res
    .status(err.status || 500)
    .json({ message: error.message || "Internal Server Error" });
};

export default errorHandler;