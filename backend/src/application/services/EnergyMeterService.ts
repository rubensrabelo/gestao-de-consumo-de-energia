import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import type { IEnergyMeterRepository } from "../../infra/repositories/IEnergyMeterRepository";
import { AppError } from "../../shared/errors/AppError";
import { EnergyMeterType } from "../../types/EnergyMeterType";

export class EnergyMeterService {
  constructor(private meterRepository: IEnergyMeterRepository) {}

  async getAllMeters(): Promise<EnergyMeterType[]> {
    return await this.meterRepository.findAll();
  }

  async createMeter(type: string): Promise<EnergyMeterType> {
    if (!type)
      throw new AppError("Meter type is required");

    EnergyMeterFactoryProvider.getFactory(type);

    return await this.meterRepository.create(type);
  }
}
