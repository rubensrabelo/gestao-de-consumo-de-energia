import { EnergyMeter } from "../entities/EnergyMeter";

export interface EnergyMeterTypeFactory {
  create(): EnergyMeter;
}
