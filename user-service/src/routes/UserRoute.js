import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  getProfile,
  LogoutUser,
  refreshAccessToken,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

//public routes
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

//private routes
router.post("/logout", authenticate, LogoutUser);

//get user
router.get("/me", authenticate, getProfile);

//refresh access token
router.get("/refresh", refreshAccessToken);

export default router;
