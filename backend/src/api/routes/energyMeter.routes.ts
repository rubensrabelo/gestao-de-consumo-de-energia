import { Router } from "express";
import { energyMeterController } from "../../config/bootstrapEnergy";

const router = Router();

router.post("/meter", (req, res) => energyMeterController.createMeter(req, res));
router.get("/meters", (req, res) => energyMeterController.getAllMeters(req, res));

export default router;
