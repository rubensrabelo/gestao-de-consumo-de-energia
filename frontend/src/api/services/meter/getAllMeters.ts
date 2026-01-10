import type { EnergyMeter } from "../../../types/domain/Meter";

export async function getAllMeters(): Promise<EnergyMeter[]> {
  const response = await fetch("http://localhost:3333/energy/meters");
  return response.json();
}
