//get profile of logged in user

import { eq } from "drizzle-orm";
import { db } from "../config/database.js";
import logger from "../utils/logger.js";
import { user } from "../models/User.js";

export const me = async (req, res) => {
  try {
    logger.info("Getting profile of logged in user");

    const userId = req.user.id;

    const profile = await db.select().from(user).where(eq(user.id, userId));

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile fetched successfully", data: profile });
  } catch (error) {
    logger.info("Error getting profile of logged in user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
