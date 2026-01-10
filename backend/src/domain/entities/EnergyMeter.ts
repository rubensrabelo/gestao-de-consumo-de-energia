import { EnergyReading } from "./EnergyReading";
import { ConsumptionCalculationStrategy } from "../strategies/ConsumptionCalculationStrategy";
import { ConsumptionState } from "../states/ConsumptionState";
import { NormalState } from "../states/NormalState";
import { Observer } from "../observers/Observer";

export class EnergyMeter {
  private readings: EnergyReading[] = [];
  private observers: Observer[] = [];

  constructor(
    private strategy: ConsumptionCalculationStrategy,
    private state: ConsumptionState = new NormalState()
  ) {}

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(event: string) {
    this.observers.forEach(o => o.update(event));
  }

  addReading(reading: EnergyReading) {
    this.readings.push(reading);
    this.analyze();
  }

  analyze() {
    const value = this.strategy.calculate(this.readings);
    this.state.handle(this, value);
  }

  changeState(state: ConsumptionState) {
    this.state = state;
    this.notify(`State changed to ${state.constructor.name}`);
  }
}
