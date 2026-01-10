import { Router } from "express";
import { EnergyController } from "../controllers/EnergyController";

const routes = Router();
const controller = new EnergyController();

routes.post("/reading", controller.registerReading);

export default routes;
