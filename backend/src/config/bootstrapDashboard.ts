import { DashboardRepository } from "../infra/repositories/DashboardRepository";
import { EnergyMeterRepository } from "../infra/repositories/EnergyMeterRepository";
import { DashboardService } from "../application/services/DashboardService";
import { DashboardController } from "../api/controllers/DashboardController";

const dashboardRepository = new DashboardRepository();
const meterRepository = new EnergyMeterRepository();

const dashboardService = new DashboardService(dashboardRepository, meterRepository);

export const dashboardController = new DashboardController(dashboardService);
