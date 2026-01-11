import mongoose, { Schema, Document } from "mongoose";

export interface EnergyReadingDocument extends Document {
  meterId: string;
  value: number;
  timestamp: Date;
}

const EnergyReadingSchema = new Schema<EnergyReadingDocument>({
  meterId: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const EnergyReadingModel = mongoose.model<EnergyReadingDocument>(
  "EnergyReading",
  EnergyReadingSchema
);
