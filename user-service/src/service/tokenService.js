import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { fileURLToPath } from 'url';
import { _config } from "../config/config.js";

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate payload took this payload 
// const payload = {
//     id: String(user.id),
//     email: user.email,
//     role: user.role,
//   };



// Generate access token
export const generateAccessToken = (payload) => {
  let privateKey;
  try {
    privateKey = fs.readFileSync(
      path.join(__dirname, "../../certs/private.pem"),
      "utf8"
    );
    if (!privateKey) {
      throw new Error("Private key is empty");
    }
  } catch (error) {
    logger.error("Error reading private key", error);
    throw error;
  }

  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "10m",
    issuer: "user-service",
  });
};

// Generate refresh token
export const generateRefreshToken = (payload) => {
  // Read public key
  let publicKey;
  try {
    publicKey = fs.readFileSync(
      path.join(__dirname, "../../certs/public.pem"),
      "utf8"
    );
  } catch (error) {
    logger.error("Error reading public key", error);
  }

  return jwt.sign(payload, _config.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: "user-service",
  });
};
