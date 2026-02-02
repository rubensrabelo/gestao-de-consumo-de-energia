import { EnergyReading } from "../../domain/entities/EnergyReading";
import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { IEnergyMeterRepository } from "../../infra/repositories/IEnergyMeterRepository";
import { AppError } from "../../shared/errors/AppError";
import { IEnergyReadingRepository } from "../../infra/repositories/IEnergyReadingRepository";

export class EnergyReadingService {
  constructor(
    private meterRepository: IEnergyMeterRepository,
    private readingRepository: IEnergyReadingRepository
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
