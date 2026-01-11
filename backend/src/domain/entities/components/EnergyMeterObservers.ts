import { Observer } from "../../observers/Observer";

export class EnergyMeterObservers {
  private observers: Observer[] = [];

  add(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(event: string): void {
    this.observers.forEach(o => o.update(event));
  }
}
