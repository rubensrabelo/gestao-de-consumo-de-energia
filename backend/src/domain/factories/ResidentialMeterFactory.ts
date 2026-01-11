import { EnergyMeter } from "../entities/EnergyMeter";
import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { ResidentialConsumptionStrategy } from "../strategies/ResidentialConsumptionStrategy";

export class ResidentialMeterFactory implements EnergyMeterFactory {
  constructor(
    private readonly strategy: ResidentialConsumptionStrategy
  ) {}

  create(): EnergyMeter {
    return new EnergyMeter(this.strategy);
  }
}