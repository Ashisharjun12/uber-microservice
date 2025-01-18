import { Router } from "express"
import { CreateRide } from "../controllers/rideController.js"

const router = Router()

router.post('/create' , CreateRide)


export default router;