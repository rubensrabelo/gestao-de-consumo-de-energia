import { Observer } from "../observers/Observer";
import { EnergyReading } from "./EnergyReading";
import { EnergyMeterAnalyzer } from "./analyzers/EnergyMeterAnalyzer";
import { EnergyMeterObservers } from "./components/EnergyMeterObservers";
import { EnergyMeterReadings } from "./components/EnergyMeterReadings";
import { EnergyMeterState } from "./components/EnergyMeterState";

export class EnergyMeter {
  constructor(
    private readonly readings: EnergyMeterReadings,
    private readonly observers: EnergyMeterObservers,
    private readonly state: EnergyMeterState,
    private readonly analyzer: EnergyMeterAnalyzer
  ) {}

  addObserver(observer: Observer): void {
    this.observers.add(observer);
  }

  notify(event: string): void {
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

    const nextStateType = this.state
      .get()
      .handle(this, value);

    if (nextStateType) {
      this.state.change(nextStateType);
      this.observers.notify(
        `State changed to ${nextStateType}`
      );
    }
  }
}
