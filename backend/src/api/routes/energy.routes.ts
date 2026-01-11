import { Router } from "express";
import { energyController } from "../../config/bootstrapEnergy";

const energyRoutes = Router();

energyRoutes.post("/reading", (req, res) =>
  energyController.registerReading(req, res)
);

energyRoutes.post("/meter", (req, res) =>
  energyController.createMeter(req, res)
);

energyRoutes.get("/meters", (req, res) =>
  energyController.getAllMeters(req, res)
);

export default energyRoutes;
