import { EnergyMeter } from "../entities/EnergyMeter";

export interface ConsumptionState {
  handle(context: EnergyMeter, value: number): void;
}
