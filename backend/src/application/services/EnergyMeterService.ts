import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import type { IEnergyMeterRepository } from "../../infra/repositories/IEnergyMeterRepository";
import { ValidationError } from "../../shared/errors/ValidationError";
import { EnergyMeterType } from "../../types/EnergyMeterType";

export class EnergyMeterService {
  constructor(private meterRepository: IEnergyMeterRepository) {}

  async getAllMeters(): Promise<EnergyMeterType[]> {
    return await this.meterRepository.findAll();
  }

  async createMeter(type: string): Promise<EnergyMeterType> {
    if (!type)
      throw new ValidationError("Meter type is required");

    EnergyMeterFactoryProvider.getFactory(type);

    return await this.meterRepository.create(type);
  }
}
