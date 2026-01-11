import { EnergyMeterFactoryProvider } from "../../domain/factories/EnergyMeterFactoryProvider";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { AppError } from "../../shared/errors/AppError";

export class EnergyMeterService {
  constructor(private meterRepository: EnergyMeterRepository) {}

  async getAllMeters(): Promise<{ id: string; type: string; createdAt: Date }[]> {
    const meters = await this.meterRepository.findAll();
    return meters.map((m: any) => ({
      id: m._id.toString(),
      type: m.type,
      createdAt: m.createdAt
    }));
  }

  async createMeter(type: string): Promise<{ id: string; type: string; createdAt: Date }> {
    if (!type) throw new AppError("Meter type is required");

    EnergyMeterFactoryProvider.getFactory(type);

    const savedMeter = await this.meterRepository.create(type);

    return {
      id: savedMeter._id.toString(),
      type: savedMeter.type,
      createdAt: savedMeter.createdAt
    };
  }
}
