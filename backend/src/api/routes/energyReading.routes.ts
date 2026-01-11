import { Router } from "express";
import { energyReadingController } from "../../config/bootstrapEnergy";

const router = Router();

router.post("/reading", (req, res) => energyReadingController.registerReading(req, res));

export default router;
