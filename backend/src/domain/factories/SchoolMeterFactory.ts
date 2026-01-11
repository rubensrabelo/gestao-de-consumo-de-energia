import { EnergyMeter } from "../entities/EnergyMeter";
import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { SchoolConsumptionStrategy } from "../strategies/SchoolConsumptionStrategy";

export class SchoolMeterFactory implements EnergyMeterFactory {
  constructor(
    private readonly strategy: SchoolConsumptionStrategy
  ) {}

  create(): EnergyMeter {
    return new EnergyMeter(this.strategy);
  }
}
