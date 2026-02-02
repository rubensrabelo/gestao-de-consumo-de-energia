import { MongoDashboardRepository } from "../infra/repositories/mongo/MongoDashboardRepository";
import { DashboardService } from "../application/services/DashboardService";
import { DashboardController } from "../api/controllers/DashboardController";
import { MongoEnergyMeterRepository } from "../infra/repositories/mongo/MongoEnergyMeterRepository";

const dashboardRepository = new MongoDashboardRepository();
const meterRepository = new MongoEnergyMeterRepository();

const dashboardService = new DashboardService(dashboardRepository, meterRepository);

export const dashboardController = new DashboardController(dashboardService);
