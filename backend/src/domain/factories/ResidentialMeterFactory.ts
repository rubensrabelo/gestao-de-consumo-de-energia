import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { EnergyMeter } from "../entities/EnergyMeter";
import { ResidentialConsumptionStrategy } from "../strategies/ResidentialConsumptionStrategy";

export class ResidentialMeterFactory extends EnergyMeterFactory {
  create(): EnergyMeter {
    return new EnergyMeter(new ResidentialConsumptionStrategy());
  }
}
