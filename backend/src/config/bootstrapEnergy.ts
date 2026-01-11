import { EnergyController } from "../api/controllers/EnergyController";
import { EnergyService } from "../application/services/EnergyService";
import { EnergyMeterRepository } from "../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../infra/repositories/EnergyReadingRepository";

const meterRepository = new EnergyMeterRepository();
const readingRepository = new EnergyReadingRepository();

const energyService = new EnergyService(meterRepository, readingRepository);

export const energyController = new EnergyController(energyService);
