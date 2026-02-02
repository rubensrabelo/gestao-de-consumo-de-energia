import type { EnergyMeterType } from "../../types/EnergyMeterType";

export interface IEnergyMeterRepository {
  create(type: string): Promise<EnergyMeterType>;
  findById(id: string): Promise<EnergyMeterType | null>;
  findAll(): Promise<EnergyMeterType[]>;
}