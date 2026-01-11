import { Router } from "express";
import { dashboardController } from "../../config/bootstrapDashboard";

const dashboardRoutes = Router();

dashboardRoutes.get("/meters/:meterId", (req, res) => dashboardController.show(req, res));

export default dashboardRoutes;
