import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { EnergyMeter } from "../entities/EnergyMeter";
import { SchoolConsumptionStrategy } from "../strategies/SchoolConsumptionStrategy";

export class SchoolMeterFactory extends EnergyMeterFactory {
  create(): EnergyMeter {
    return new EnergyMeter(new SchoolConsumptionStrategy());
  }
}
