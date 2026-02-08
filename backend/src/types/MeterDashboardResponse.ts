import { DailyConsumptionType } from "./DailyConsumptionType";

export type MeterDashboardResponse = {
  meterId: string;
  meterType: string;
  totalConsumption: number;
  averageConsumption: number;
  dailyConsumption: DailyConsumptionType[];
};