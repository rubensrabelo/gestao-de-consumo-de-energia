import { EnergyMeterService } from "../application/services/EnergyMeterService";
import { EnergyReadingService } from "../application/services/EnergyReadingService";
import { EnergyMeterController } from "../api/controllers/EnergyMeterController";
import { EnergyReadingController } from "../api/controllers/EnergyReadingController";
import { MongoEnergyMeterRepository } from "../infra/repositories/mongo/MongoEnergyMeterRepository";
import { MongoEnergyReadingRepository } from "../infra/repositories/mongo/MongoEnergyReadingRepository";

const meterRepository = new MongoEnergyMeterRepository();
const readingRepository = new MongoEnergyReadingRepository();

const meterService = new EnergyMeterService(meterRepository);
const readingService = new EnergyReadingService(meterRepository, readingRepository);

export const energyMeterController = new EnergyMeterController(meterService);
export const energyReadingController = new EnergyReadingController(readingService);
