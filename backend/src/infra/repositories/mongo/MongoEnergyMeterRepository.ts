import { IEnergyMeterRepository } from "../IEnergyMeterRepository";
import { EnergyMeterModel } from "../models/EnergyMeter";
import type { EnergyMeterType } from "../../../types/EnergyMeterType";

export class MongoEnergyMeterRepository implements IEnergyMeterRepository {
  async create(type: string): Promise<EnergyMeterType> {
    const meter = new EnergyMeterModel({ type });
    return meter.save();
  }

  async findById(id: string): Promise<EnergyMeterType | null> {
    return await EnergyMeterModel.findById(id);
  }

  async findAll(): Promise<EnergyMeterType[]> {
    return await EnergyMeterModel.find();
  }
}
