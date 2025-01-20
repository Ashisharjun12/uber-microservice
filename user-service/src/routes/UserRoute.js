import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  refreshAccessToken,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

//public routes
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

//private routes
router.post("/logout", authenticate, LogoutUser);

//refresh access token
router.get("/refresh", refreshAccessToken);

//users routes
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);

export default router;
