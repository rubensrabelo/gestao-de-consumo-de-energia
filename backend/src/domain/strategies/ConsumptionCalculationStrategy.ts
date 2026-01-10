import { EnergyReading } from "../entities/EnergyReading";

export interface ConsumptionCalculationStrategy {
  calculate(readings: EnergyReading[]): number;
}
