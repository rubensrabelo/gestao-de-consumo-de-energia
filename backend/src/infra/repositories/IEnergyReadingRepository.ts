import type{ EnergyReadingType } from "../../types/EnergyReadingType";

export interface IEnergyReadingRepository {
  save(meterId: string, value: number): Promise<EnergyReadingType>;
  findByMeter(meterId: string): Promise<EnergyReadingType[]>;
}