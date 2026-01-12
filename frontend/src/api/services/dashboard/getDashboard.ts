import type { EnergyDashboard } from "../../../types/dashboard/EnergyDashboard";
import { http } from "../base/http";

export async function getDashboard(
  meterId: string
): Promise<EnergyDashboard> {
  return http<EnergyDashboard>(`dashboard/meters/${meterId}`);
}
