import { ResidentialMeterFactory } from "./ResidentialMeterFactory";
import { SchoolMeterFactory } from "./SchoolMeterFactory";
import { EnergyMeterTypeFactory } from "./EnergyMeterTypeFactory";
import { ResidentialConsumptionStrategy } from "../strategies/ResidentialConsumptionStrategy";
import { SchoolConsumptionStrategy } from "../strategies/SchoolConsumptionStrategy";
import { AppError } from "../../shared/errors/AppError";

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
      throw new AppError("Invalid meter type");
    }
    return factory;
  }
}
