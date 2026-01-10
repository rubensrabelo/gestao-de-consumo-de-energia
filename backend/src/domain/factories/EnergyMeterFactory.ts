import { EnergyMeter } from "../entities/EnergyMeter";

export abstract class EnergyMeterFactory {
  abstract create(): EnergyMeter;
}
