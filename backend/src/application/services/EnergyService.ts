import { EnergyReading } from "../../domain/entities/EnergyReading";
import { EnergyMeterFactory } from "../../domain/factories/EnergyMeterFactory";
import { ResidentialMeterFactory } from "../../domain/factories/ResidentialMeterFactory";
import { SchoolMeterFactory } from "../../domain/factories/SchoolMeterFactory";
import { AlertObserver } from "../../domain/observers/AlertObserver";
import { HistoryObserver } from "../../domain/observers/HistoryObserver";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../../infra/repositories/EnergyReadingRepository";
import { AppError } from "../../shared/errors/AppError";

export class EnergyService {
  private meterRepository = new EnergyMeterRepository();
  private readingRepository = new EnergyReadingRepository();

  async getAllMeters() {
    const meters = await this.meterRepository.findAll();
    return meters.map(m => ({
      id: m._id,
      type: m.type,
      createdAt: m.createdAt
    }));
  }

  async createMeter(type: string) {
    if (!type) {
      throw new AppError("Meter type is required");
    }

    let factory: EnergyMeterFactory;

    switch (type) {
      case "RESIDENTIAL":
        factory = new ResidentialMeterFactory();
        break;

      case "SCHOOL":
        factory = new SchoolMeterFactory();
        break;

      default:
        throw new AppError("Invalid meter type");
    }

    const meter = factory.create();

    const savedMeter = await this.meterRepository.create(type);

    return {
      id: savedMeter.id,
      type: savedMeter.type,
      createdAt: savedMeter.createdAt
    };
  }

  async registerReading(meterId: string, value: number): Promise<void> {
    if (!meterId) {
      throw new AppError("Meter ID is required");
    }

    if (value <= 0) {
      throw new AppError("Consumption value must be greater than zero");
    }

    const meterData = await this.meterRepository.findById(meterId);

    if (!meterData) {
      throw new AppError("Energy meter not found", 404);
    }

    let factory: EnergyMeterFactory;

    switch (meterData.type) {
      case "RESIDENTIAL":
        factory = new ResidentialMeterFactory();
        break;

      case "SCHOOL":
        factory = new SchoolMeterFactory();
        break;

      default:
        throw new AppError("Invalid meter type");
    }

    const meter = factory.create();

    meter.addObserver(new AlertObserver());
    meter.addObserver(new HistoryObserver());

    const reading = new EnergyReading(value);
    meter.addReading(reading);

    await this.readingRepository.save(meterId, value);
  }
}