import { MeterDashboardResponse } from "../../types/MeterDashboardResponse";

export interface IDashboardService {
  getMeterDashboard(meterId: string): Promise<MeterDashboardResponse>;
}