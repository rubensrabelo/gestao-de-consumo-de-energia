import { EnergyReading } from "./EnergyReading";
import { ConsumptionCalculationStrategy } from "../strategies/ConsumptionCalculationStrategy";
import { ConsumptionState } from "../states/ConsumptionState";
import { Observer } from "../observers/Observer";
import { ConsumptionStateProvider } from "../states/ConsumptionStateProvider";
import { ConsumptionStateType } from "../states/enums/ConsumptionStateType";

export class EnergyMeter {
  private readings: EnergyReading[] = [];
  private observers: Observer[] = [];
  private state: ConsumptionState;

  constructor(
    private readonly strategy: ConsumptionCalculationStrategy
  ) {
    this.state = ConsumptionStateProvider.get(
      ConsumptionStateType.NORMAL
    );
  }

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(event: string): void {
    this.observers.forEach(o => o.update(event));
  }

  addReading(reading: EnergyReading): void {
    this.readings.push(reading);
    this.analyze();
  }

  private analyze(): void {
    const value = this.strategy.calculate(this.readings);

    const nextStateType = this.state.handle(this, value);

    if (nextStateType) {
      this.state = ConsumptionStateProvider.get(nextStateType);
      this.notify(`State changed to ${nextStateType}`);
    }
  }
}
