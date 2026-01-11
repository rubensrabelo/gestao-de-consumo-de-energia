import { EnergyReadingModel, EnergyReadingDocument } from "./models/EnergyReading";

export class EnergyReadingRepository {
  async save(meterId: string, value: number): Promise<EnergyReadingDocument> {
    const reading = new EnergyReadingModel({ meterId, value });
    return reading.save();
  }

  async findByMeter(meterId: string): Promise<EnergyReadingDocument[]> {
    return EnergyReadingModel.find({ meterId });
  }
}
