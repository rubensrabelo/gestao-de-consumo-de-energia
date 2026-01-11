import { EnergyReading } from "./EnergyReading";
import { ConsumptionCalculationStrategy } from "../strategies/ConsumptionCalculationStrategy";
import { EnergyMeterAnalyzer } from "./analyzers/EnergyMeterAnalyzer";
import { EnergyMeterObservers } from "./components/EnergyMeterObservers";
import { EnergyMeterReadings } from "./components/EnergyMeterReadings";
import { EnergyMeterState } from "./components/EnergyMeterState";

export class EnergyMeter {
  private readonly readings: EnergyMeterReadings;
  private readonly observers: EnergyMeterObservers;
  private readonly state: EnergyMeterState;
  private readonly analyzer: EnergyMeterAnalyzer;

  constructor(strategy: ConsumptionCalculationStrategy) {
    this.readings = new EnergyMeterReadings();
    this.observers = new EnergyMeterObservers();
    this.state = new EnergyMeterState();
    this.analyzer = new EnergyMeterAnalyzer(strategy);
  }

  addObserver(observer: any): void {
    this.observers.add(observer);
  }

  notify(event: string) {
    this.observers.notify(event);
  }

  addReading(reading: EnergyReading): void {
    this.readings.add(reading);
    this.analyze();
  }

  private analyze(): void {
    const value = this.analyzer.calculate(
      this.readings.getAll()
    );

    const currentState = this.state.get();
    const nextStateType = currentState.handle(this, value);

    if (nextStateType) {
      this.state.change(nextStateType);
      this.observers.notify(
        `State changed to ${nextStateType}`
      );
    }
  }
}
