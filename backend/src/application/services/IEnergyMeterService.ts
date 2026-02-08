import { EnergyMeterType } from "../../types/EnergyMeterType";

export interface IEnergyMeterService {
  getAllMeters(): Promise<EnergyMeterType[]>;
  createMeter(type: string): Promise<EnergyMeterType>;
}