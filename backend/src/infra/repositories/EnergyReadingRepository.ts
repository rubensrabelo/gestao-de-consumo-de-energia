import mongoose, { Schema, Document } from "mongoose";

interface EnergyReadingDocument extends Document {
  meterId: string;
  value: number;
  timestamp: Date;
}

const EnergyReadingSchema = new Schema<EnergyReadingDocument>({
  meterId: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const EnergyReadingModel = mongoose.model<EnergyReadingDocument>(
  "EnergyReading",
  EnergyReadingSchema
);

export class EnergyReadingRepository {
  async save(meterId: string, value: number) {
    const reading = new EnergyReadingModel({ meterId, value });
    return reading.save();
  }

  async findByMeter(meterId: string) {
    return EnergyReadingModel.find({ meterId });
  }
}
