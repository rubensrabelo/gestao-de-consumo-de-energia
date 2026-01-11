import { EnergyReading } from "../../domain/entities/EnergyReading";
import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../../infra/repositories/EnergyReadingRepository";
import { AppError } from "../../shared/errors/AppError";
import { EnergyMeter } from "../../domain/entities/EnergyMeter";

export class EnergyService {
  constructor(
    private meterRepository: EnergyMeterRepository,
    private readingRepository: EnergyReadingRepository
  ) {}

  async getAllMeters(): Promise<{ id: string; type: string; createdAt: Date }[]> {
    const meters = await this.meterRepository.findAll();

    return meters.map((m: any) => ({
      id: m._id.toString(),
      type: m.type,
      createdAt: m.createdAt
    }));
  }

  async createMeter(type: string): Promise<{ id: string; type: string; createdAt: Date }> {
    if (!type) {
      throw new AppError("Meter type is required");
    }

    // Validação e criação via provider
    EnergyMeterFactoryProvider.getFactory(type);

    const savedMeter = await this.meterRepository.create(type);

    return {
      id: savedMeter._id.toString(),
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

    meter.addReading(new EnergyReading(value));

    await this.readingRepository.save(meterId, value);
  }
}
