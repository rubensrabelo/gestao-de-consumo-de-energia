import { ConsumptionCalculationStrategy } from "./ConsumptionCalculationStrategy";
import { EnergyReading } from "../entities/EnergyReading";

export class SchoolConsumptionStrategy implements ConsumptionCalculationStrategy {
  calculate(readings: EnergyReading[]): number {
    return readings.reduce((sum, r) => sum + r.value, 0) * 1.1;
  }
}
