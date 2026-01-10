import { Router } from "express";
import { EnergyController } from "../controllers/EnergyController";

const energyRoutes = Router();
const energyController = new EnergyController();

energyRoutes.post("/reading", (req, res) =>
  energyController.registerReading(req, res)
);

energyRoutes.post("/meter", (req, res) =>
  energyController.createMeter(req, res)
);

export default energyRoutes;
