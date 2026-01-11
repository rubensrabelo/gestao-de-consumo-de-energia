import { EnergyReading } from "../../domain/entities/EnergyReading";
import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../../infra/repositories/EnergyReadingRepository";
import { AppError } from "../../shared/errors/AppError";

export class EnergyReadingService {
  constructor(
    private meterRepository: EnergyMeterRepository,
    private readingRepository: EnergyReadingRepository
  ) {}

  async registerReading(meterId: string, value: number): Promise<void> {
    if (!meterId) throw new AppError("Meter ID is required");
    if (value <= 0) throw new AppError("Consumption value must be greater than zero");

    const meterData = await this.meterRepository.findById(meterId);
    if (!meterData) throw new AppError("Energy meter not found", 404);

    const factory = EnergyMeterFactoryProvider.getFactory(meterData.type);
    const meter = factory.create();

    meter.addReading(new EnergyReading(value));

    await this.readingRepository.save(meterId, value);
  }
}
