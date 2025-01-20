import { user } from "../models/User.js";
import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import { _config } from "../config/config.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../service/tokenService.js";
import logger from "../utils/logger.js";
import { eq } from "drizzle-orm";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookieToken.js";

//generate access and refresh token method
const generateAccessAndRefreshToken = async (userPayload) => {
  logger.info("Generating access and refresh token", userPayload);
  try {
    const accessToken = generateAccessToken({
      id: userPayload.id,
      email: userPayload.email,
      role: userPayload.role,
    });
    const refreshToken = generateRefreshToken({
      id: userPayload.id,
      email: userPayload.email,
      role: userPayload.role,
    });

    //refreshtoken update in db
    await db
      .update(user)
      .set({ refreshToken: refreshToken })
      .where(eq(user.id, userPayload.id));

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error("Error generating access and refresh token", error);
    throw error;
  }
};

//register user controller
export const RegisterUser = async (req, res) => {
  try {
    logger.info("Registering user route hitting....", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exists
    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const [newUser] = await db
      .insert(user)
      .values({
        name,
        email,
        password: hashedPassword,
        role: "user",
      })
      .returning();

    if (!newUser) {
      return res.status(500).json({ message: "Error creating user" });
    }

    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      newUser
    );

    //set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    logger.error("Error registering user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    logger.info("Login user route hitting....", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exists
    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //get user
    const loggedInUser = userExists[0];

    //compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loggedInUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      loggedInUser
    );

    //set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      user: loggedInUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    logger.error("Error logging in user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    logger.info("Logout user route hitting....", req.body);
    //get user id from authenticate middleware
    const userId = req.user.id;

    //clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    //update refresh token in db
    await db
      .update(user)
      .set({ refreshToken: null })
      .where(eq(user.id, userId));

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    logger.error("Error logging out user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    logger.info("Get profile route hitting....", req.body);
    const getUsers = await db.select().from(user)
    
    return res
      .status(200)
      .json({ message: "Profile fetched successfully", users: getUsers });
  } catch (error) {
    logger.error("Error fetching profile", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//get user by id
export const getUserById = async (req, res) => {
  try {
    logger.info("Get user by id route hitting....", req.body);

    const userId = req.params.id;

    const getUser = await db.select().from(user).where(eq(user.id, userId))

    return res.status(200).json({ message: "User fetched successfully", user: getUser });


  } catch (error) {
    logger.error("Error fetching profile", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//refresh access token

export const refreshAccessToken = async (req, res) => {
  try {
    logger.info("Refresh access token route hitting....", req.body);
    //get refresh token from cookies or body
    const IncomingRefreshToken =
      req.cookies?.refresh_token || req.body.refreshToken;

    if (!IncomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized Refresh Token" });
    }

    //verify refresh token
    const decoded = jwt.verify(
      IncomingRefreshToken,
      _config.REFRESH_TOKEN_SECRET
    );

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized Refresh Token" });
    }

    //get user from db
    const getUser = await db.select().from(user).where(eq(user.id, decoded.id));

    if (!getUser) {
      return res.status(401).json({ message: "Unauthorized Refresh Token" });
    }

    const storedUser = getUser[0];

    //check if refresh token is valid
    if (storedUser.refreshToken !== IncomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized Refresh Token" });
    }

    //generate access token
    const accessToken = generateAccessToken({
      id: storedUser.id,
      email: storedUser.email,
      role: storedUser.role,
    });

    //set access token in cookies
    res.cookie("access_token", accessToken, accessTokenOptions);

    return res
      .status(200)
      .json({
        message: "Access Token Refreshed Successfully",
        accessToken: accessToken,
      });
  } catch (error) {
    logger.error("Error refreshing access token", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
