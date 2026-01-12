import { http } from "../base/http";
import type { EnergyMeter } from "../../../types/domain/Meter";

export async function getAllMeters(): Promise<EnergyMeter[]> {
  return http<EnergyMeter[]>("energy/meters");
}
