import mongoose, { Schema, Document } from "mongoose";

interface EnergyMeterDocument extends Document {
  type: string;
  createdAt: Date;
}

const EnergyMeterSchema = new Schema<EnergyMeterDocument>({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const EnergyMeterModel = mongoose.model<EnergyMeterDocument>(
  "EnergyMeter",
  EnergyMeterSchema
);

export class EnergyMeterRepository {
  async create(type: string) {
    const meter = new EnergyMeterModel({ type });
    return meter.save();
  }

  async findById(id: string) {
    return EnergyMeterModel.findById(id);
  }
}
