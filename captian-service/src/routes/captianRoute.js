import {Router} from "express";
import { getCaptian } from "../controllers/captianController.js";

const router = Router();

router.get("/", getCaptian);


export default router;