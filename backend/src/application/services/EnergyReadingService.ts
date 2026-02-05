import { EnergyReading } from "../../domain/entities/EnergyReading";
import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { IEnergyMeterRepository } from "../../infra/repositories/IEnergyMeterRepository";
import { IEnergyReadingRepository } from "../../infra/repositories/IEnergyReadingRepository";
import { ValidationError } from "../../shared/errors/ValidationError";
import { MeterNotFoundError } from "./errors/MeterNotFoundError";
import { InvalidConsumptionValueError } from "./errors/InvalidConsumptionValueError";

export class EnergyReadingService {
  constructor(
    private meterRepository: IEnergyMeterRepository,
    private readingRepository: IEnergyReadingRepository
  ) {}

  async registerReading(meterId: string, value: number): Promise<void> {
    if (!meterId) 
      throw new ValidationError("Meter ID is required");

    if (value <= 0) 
      throw new InvalidConsumptionValueError(value);

    const meterData = await this.meterRepository.findById(meterId);
    if (!meterData) 
      throw new MeterNotFoundError(meterId);

    const factory = EnergyMeterFactoryProvider.getFactory(meterData.type);
    const meter = factory.create();

    meter.addReading(new EnergyReading(value));

    await this.readingRepository.save(meterId, value);
  }
}
