import type { EnergyMeterType } from "../enums/MeterTypeEnum";
import type { DailyConsumption } from "./DailyConsumption";

export interface EnergyDashboard {
  meterId: string;
  meterType: EnergyMeterType;
  totalConsumption: number;
  averageConsumption: number;
  dailyConsumption: DailyConsumption[];
}