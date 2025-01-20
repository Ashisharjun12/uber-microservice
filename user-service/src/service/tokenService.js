import jwt from "jsonwebtoken";
import { _config } from "../config/config.js";

// Generate access token
export const generateAccessToken = (payload) => {
 

  return jwt.sign(payload, _config.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "10m",
    issuer: "user-service",

   
  });
};

// Generate refresh token
export const generateRefreshToken = (payload) => {

  return jwt.sign(payload, _config.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: "user-service",
    
  });
};
