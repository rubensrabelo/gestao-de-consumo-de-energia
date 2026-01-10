import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";

const dashboardRoutes = Router();
const controller = new DashboardController();

dashboardRoutes.get(
  "/meters/:meterId",
  controller.show.bind(controller)
);

export { dashboardRoutes };
