import { EnergyReading } from "../../domain/entities/EnergyReading";
import { AlertObserver } from "../../domain/observers/AlertObserver";
import { HistoryObserver } from "../../domain/observers/HistoryObserver";
import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../../infra/repositories/EnergyReadingRepository";
import { AppError } from "../../shared/errors/AppError";
import { EnergyMeter } from "../../domain/entities/EnergyMeter";

export class EnergyService {
  private meterRepository = new EnergyMeterRepository();
  private readingRepository = new EnergyReadingRepository();

  async getAllMeters(): Promise<{ id: string; type: string; createdAt: Date }[]> {
    const meters = await this.meterRepository.findAll();

    return meters.map((m: any) => ({
      id: m._id,
      type: m.type,
      createdAt: m.createdAt
    }));
  }

  async createMeter(type: string): Promise<{ id: string; type: string; createdAt: Date }> {
    if (!type) {
      throw new AppError("Meter type is required");
    }

    // Validação e criação via provider
    const factory = EnergyMeterFactoryProvider.getFactory(type);
    const meter: EnergyMeter = factory.create();

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

    const factory = EnergyMeterFactoryProvider.getFactory(meterData.type);
    const meter: EnergyMeter = factory.create();

    meter.addObserver(new AlertObserver());
    meter.addObserver(new HistoryObserver());

    const reading = new EnergyReading(value);
    meter.addReading(reading);

    await this.readingRepository.save(meterId, value);
  }
}
