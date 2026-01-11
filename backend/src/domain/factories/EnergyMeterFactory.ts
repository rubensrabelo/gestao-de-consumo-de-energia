import { EnergyMeter } from "../entities/EnergyMeter";

export interface EnergyMeterFactory {
  create(): EnergyMeter;
}