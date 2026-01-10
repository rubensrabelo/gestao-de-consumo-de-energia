import { EnergyReading } from "../entities/EnergyReading";
import { ResidentialMeterFactory } from "../factories/ResidentialMeterFactory";
import { AlertObserver } from "../observers/AlertObserver";
import { HistoryObserver } from "../observers/HistoryObserver";

export class EnergyManagementFacade {
  private meter = new ResidentialMeterFactory().create();

  constructor() {
    this.meter.addObserver(new AlertObserver());
    this.meter.addObserver(new HistoryObserver());
  }

  registerReading(meterId: string, value: number) {
    const reading = new EnergyReading(value);
    this.meter.addReading(reading);
  }
}
