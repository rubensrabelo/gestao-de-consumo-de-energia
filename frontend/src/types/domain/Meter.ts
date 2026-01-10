import type { EnergyMeterType } from "../enums/MeterTypeEnum";

export interface EnergyMeter {
  id: string;
  type: EnergyMeterType;
  createdAt: string;
}