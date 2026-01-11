import { EnergyMeterService } from "../application/services/EnergyMeterService";
import { EnergyReadingService } from "../application/services/EnergyReadingService";
import { EnergyMeterRepository } from "../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../infra/repositories/EnergyReadingRepository";
import { EnergyMeterController } from "../api/controllers/EnergyMeterController";
import { EnergyReadingController } from "../api/controllers/EnergyReadingController";

const meterRepository = new EnergyMeterRepository();
const readingRepository = new EnergyReadingRepository();

const meterService = new EnergyMeterService(meterRepository);
const readingService = new EnergyReadingService(meterRepository, readingRepository);

export const energyMeterController = new EnergyMeterController(meterService);
export const energyReadingController = new EnergyReadingController(readingService);
