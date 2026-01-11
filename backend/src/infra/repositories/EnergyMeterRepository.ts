import { EnergyMeterModel, EnergyMeterDocument } from "./models/EnergyMeter";

export class EnergyMeterRepository {
  async create(type: string): Promise<EnergyMeterDocument> {
    const meter = new EnergyMeterModel({ type });
    return meter.save();
  }

  async findById(id: string): Promise<EnergyMeterDocument | null> {
    return EnergyMeterModel.findById(id);
  }

  async findAll(): Promise<EnergyMeterDocument[]> {
    return EnergyMeterModel.find();
  }
}
