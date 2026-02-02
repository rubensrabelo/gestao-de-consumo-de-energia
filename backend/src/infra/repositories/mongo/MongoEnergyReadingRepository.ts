import { EnergyReadingType } from "../../../types/EnergyReadingType";
import { IEnergyReadingRepository } from "../IEnergyReadingRepository";
import { EnergyReadingModel } from "../models/EnergyReading";

export class MongoEnergyReadingRepository implements IEnergyReadingRepository{
  async save(meterId: string, value: number): Promise<EnergyReadingType> {
    const reading = new EnergyReadingModel({ meterId, value });
    return await reading.save();
  }

  async findByMeter(meterId: string): Promise<EnergyReadingType[]> {
    return await EnergyReadingModel.find({ meterId });
  }
}
