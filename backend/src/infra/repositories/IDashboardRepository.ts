import type { ConsumptionSummaryType } from "../../types/ConsumptionSummaryType";
import { DailyConsumptionType } from "../../types/DailyConsumptionType";

export interface IDashboardRepository {
  getConsumptionSummary(meterId: string): Promise<ConsumptionSummaryType>;
  getDailyConsumption(meterId: string): Promise<DailyConsumptionType[]>;
}