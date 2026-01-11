import { EnergyReading } from "../EnergyReading";

export class EnergyMeterReadings {
  private readings: EnergyReading[] = [];

  add(reading: EnergyReading): void {
    this.readings.push(reading);
  }

  getAll(): EnergyReading[] {
    return [...this.readings];
  }
}
