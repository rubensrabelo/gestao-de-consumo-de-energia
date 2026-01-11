import { EnergyMeter } from "../entities/EnergyMeter";
import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { EnergyMeterTypeFactory } from "./EnergyMeterTypeFactory";
import { ConsumptionCalculationStrategy } from "../strategies/ConsumptionCalculationStrategy";

export class ResidentialMeterFactory
  implements EnergyMeterTypeFactory {

  constructor(
    private readonly strategy: ConsumptionCalculationStrategy
  ) {}

  create(): EnergyMeter {
    return EnergyMeterFactory.create(this.strategy);
  }
}
