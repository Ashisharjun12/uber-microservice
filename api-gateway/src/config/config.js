import dotenv from "dotenv";

dotenv.config();

const { PORT, REDIS_URL, JWT_SECRET, USER_SERVICE_URL, CAPTIAN_SERVICE_URL, RIDE_SERVICE_URL } = process.env;

export const _config = {
    PORT,
    REDIS_URL,
    JWT_SECRET,
    USER_SERVICE_URL,
    CAPTIAN_SERVICE_URL,
    RIDE_SERVICE_URL
}



