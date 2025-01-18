

import { _config } from "../config/config.js";

export const accessTokenOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const refreshTokenOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  httpOnly: true,
  secure: true,
  sameSite: "none",
};




