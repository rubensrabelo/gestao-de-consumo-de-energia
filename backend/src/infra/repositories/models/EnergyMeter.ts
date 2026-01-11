import mongoose, { Schema, Document } from "mongoose";

export interface EnergyMeterDocument extends Document {
  type: string;
  createdAt: Date;
}

const EnergyMeterSchema = new Schema<EnergyMeterDocument>({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const EnergyMeterModel = mongoose.model<EnergyMeterDocument>(
  "EnergyMeter",
  EnergyMeterSchema
);
