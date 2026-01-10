import { ConsumptionState } from "./ConsumptionState";
import { EnergyMeter } from "../entities/EnergyMeter";

export class CriticalState implements ConsumptionState {
  handle(context: EnergyMeter) {
    context.notify("Critical consumption level reached!");
  }
}
