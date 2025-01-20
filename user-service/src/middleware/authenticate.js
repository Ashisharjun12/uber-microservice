import jwt from "jsonwebtoken";
import { user } from "../models/User.js";
import { _config } from "../config/config.js";
import logger from "../utils/logger.js";
import { db } from "../config/database.js";
import { eq } from "drizzle-orm";

export const authenticate = async (req, res, next) => {
  try {
    logger.info("hitting auth middleware...");
    //get token from cookies or headers
    const token = req.cookies?.access_token || req.headers.authorization.replace("Bearer ", "");

    // console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized......not tok" });y
    }

    //verify token
    const decoded = jwt.verify(token, _config.ACCESS_TOKEN_SECRET);

    // console.log("decoded token", decoded);

    //get user from database
    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.id, decoded.id));
    if (!findUser) {
      return res
        .status(401)
        .json({ message: "Unauthorized , Invalid Access token" });
    }

    req.user = findUser[0];
    next();
  } catch (error) {
    logger.error("Error authenticating user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
