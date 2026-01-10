import { ConsumptionCalculationStrategy } from "./ConsumptionCalculationStrategy";
import { EnergyReading } from "../entities/EnergyReading";

export class ResidentialConsumptionStrategy implements ConsumptionCalculationStrategy {
  calculate(readings: EnergyReading[]): number {
    return readings.reduce((sum, r) => sum + r.value, 0);
  }
}
