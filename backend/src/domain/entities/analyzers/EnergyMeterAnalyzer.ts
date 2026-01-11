import { EnergyReading } from "../EnergyReading";
import { ConsumptionCalculationStrategy } from "../../strategies/ConsumptionCalculationStrategy";

export class EnergyMeterAnalyzer {
  constructor(
    private readonly strategy: ConsumptionCalculationStrategy
  ) {}

  calculate(readings: EnergyReading[]): number {
    return this.strategy.calculate(readings);
  }
}
