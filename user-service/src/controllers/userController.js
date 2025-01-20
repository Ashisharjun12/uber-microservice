import { user } from "../models/User.js";
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import { generateAccessToken ,generateRefreshToken} from "../service/tokenService.js";
import logger from "../utils/logger.js";
import { eq } from "drizzle-orm";
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookieToken.js";


//generate access and refresh token
const generateAccessAndRefreshToken = async (userPayload) => {
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
}

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
    await db.insert(user).values({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Get the created user
    const [newUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!newUser) {
      return res.status(500).json({ message: "Error creating user" });
    }

    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser);

    //set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

   

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
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
    const userExists = await db.select().from(user).where(eq(user.email , email))
    
    if(!userExists){
      return res.status(400).json({ message: "User does not exist" });
    }

    //get user
    const loggedInUser = userExists[0];
   

    //compare password
    const isPasswordCorrect = await bcrypt.compare(password , loggedInUser.password)
    if(!isPasswordCorrect){
      return res.status(400).json({ message: "Invalid password" });
    }


    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(loggedInUser);

    //set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return res.status(200).json({ message: "User logged in successfully" , user: loggedInUser });  

    
  } catch (error) {
    logger.error("Error logging in user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    logger.info("Logout user route hitting....", req.body);
   


  } catch (error) {
    logger.error("Error logging out user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const getProfile = async (req, res) => {
  try {
    logger.info("Get profile route hitting....", req.body);
    const user = req.user.id
    const userProfile = await db.select().from(user).where(eq(user.id , user))
    console.log(userProfile)
    return res.status(200).json({ message: "Profile fetched successfully", user: userProfile });
  } catch (error) {
    logger.error("Error fetching profile", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



//get publickey constroller
