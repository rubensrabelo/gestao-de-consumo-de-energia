import { EnergyMeter } from "../entities/EnergyMeter";
import { ConsumptionCalculationStrategy } from "../strategies/ConsumptionCalculationStrategy";
import { EnergyMeterAnalyzer } from "../entities/analyzers/EnergyMeterAnalyzer";
import { EnergyMeterObservers } from "../entities/components/EnergyMeterObservers";
import { EnergyMeterReadings } from "../entities/components/EnergyMeterReadings";
import { EnergyMeterState } from "../entities/components/EnergyMeterState";

export class EnergyMeterFactory {
  static create(
    strategy: ConsumptionCalculationStrategy
  ): EnergyMeter {
    return new EnergyMeter(
      new EnergyMeterReadings(),
      new EnergyMeterObservers(),
      new EnergyMeterState(),
      new EnergyMeterAnalyzer(strategy)
    );
  }
}
