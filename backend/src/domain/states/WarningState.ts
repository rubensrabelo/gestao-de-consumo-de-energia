import { ConsumptionState } from "./ConsumptionState";
import { EnergyMeter } from "../entities/EnergyMeter";
import { CriticalState } from "./CriticalState";

export class WarningState implements ConsumptionState {
  handle(context: EnergyMeter, value: number) {
    if (value > 1000) {
      context.changeState(new CriticalState());
    }
  }
}
