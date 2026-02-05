import { ResidentialMeterFactory } from "./ResidentialMeterFactory";
import { SchoolMeterFactory } from "./SchoolMeterFactory";
import { EnergyMeterTypeFactory } from "./EnergyMeterTypeFactory";
import { ResidentialConsumptionStrategy } from "../strategies/ResidentialConsumptionStrategy";
import { SchoolConsumptionStrategy } from "../strategies/SchoolConsumptionStrategy";
import { InvalidEnergyMeterTypeError } from "./errors/InvalidEnergyMeterTypeError ";

export class EnergyMeterFactoryProvider {
  private static readonly factories: Record<
    string,
    EnergyMeterTypeFactory
  > = {
      RESIDENTIAL: new ResidentialMeterFactory(
        new ResidentialConsumptionStrategy()
      ),
      SCHOOL: new SchoolMeterFactory(
        new SchoolConsumptionStrategy()
      )
    };

  static getFactory(type: string): EnergyMeterTypeFactory {
    const factory = this.factories[type];
    if (!factory) {
      throw new InvalidEnergyMeterTypeError(
        type,
        Object.keys(this.factories)
      );
    }
    return factory;
  }
}
