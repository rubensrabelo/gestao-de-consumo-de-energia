import { EnergyMeter } from "../../domain/entities/EnergyMeter";
import { EnergyReading } from "../../domain/entities/EnergyReading";
import { AlertObserver } from "../../domain/observers/AlertObserver";
import { HistoryObserver } from "../../domain/observers/HistoryObserver";
import { ResidentialConsumptionStrategy } from "../../domain/strategies/ResidentialConsumptionStrategy";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { EnergyReadingRepository } from "../../infra/repositories/EnergyReadingRepository";
import { AppError } from "../../shared/errors/AppError";

export class EnergyService {
  private meterRepository = new EnergyMeterRepository();
  private readingRepository = new EnergyReadingRepository();

  async registerReading(meterId: string, value: number) {
    if (value <= 0) {
      throw new AppError("Consumption value must be greater than zero");
    }

    const meterExists = await this.meterRepository.findById(meterId);
    if (!meterExists) {
      throw new AppError("Energy meter not found", 404);
    }

    const meter = new EnergyMeter(new ResidentialConsumptionStrategy());
    meter.addObserver(new AlertObserver());
    meter.addObserver(new HistoryObserver());

    const reading = new EnergyReading(value);
    meter.addReading(reading);

    await this.readingRepository.save(meterId, value);
  }
}
