import Redis from "ioredis";
import logger from "../utils/logger.js";
import { _config } from "./config.js";

const redisClient = ()=>{
    const redisUrl=_config.REDIS_URL

    logger.info('Attempting to connect to Redis...',redisUrl)
    if (redisUrl) {
        const client = new Redis(redisUrl);
        client.on("connect", () => {
          logger.info("Redis is connected successfully!!");
        });
    
        client.on("error", (err) => {
          logger.error("Redis connection error:", err);
        });
        
        return client;
      } else {
        throw new Error("Redis connection failed. URI is undefined.");
      }
}

export const redis = redisClient();
