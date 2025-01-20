import { Router } from "express";
import { RegisterUser, LoginUser, getProfile, LogoutUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();



router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);

//get publickey
router.get("/self", getPublicKey);


//get user
router.get("/me", authMiddleware, getProfile);

export default router;
