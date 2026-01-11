import { EnergyMeterFactory } from "./EnergyMeterFactory";
import { ResidentialMeterFactory } from "./ResidentialMeterFactory";
import { SchoolMeterFactory } from "./SchoolMeterFactory";
import { ResidentialConsumptionStrategy } from "../strategies/ResidentialConsumptionStrategy";
import { SchoolConsumptionStrategy } from "../strategies/SchoolConsumptionStrategy";
import { AppError } from "../../shared/errors/AppError";

export class EnergyMeterFactoryProvider {
  private static factories: Record<string, EnergyMeterFactory> = {
    RESIDENTIAL: new ResidentialMeterFactory(
      new ResidentialConsumptionStrategy()
    ),
    SCHOOL: new SchoolMeterFactory(
      new SchoolConsumptionStrategy()
    )
  };

  static getFactory(type: string): EnergyMeterFactory {
    const factory = this.factories[type];
    if (!factory) {
      throw new AppError("Invalid meter type");
    }
    return factory;
  }
}
