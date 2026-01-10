import { ConsumptionState } from "./ConsumptionState";
import { EnergyMeter } from "../entities/EnergyMeter";
import { WarningState } from "./WarningState";

export class NormalState implements ConsumptionState {
  handle(context: EnergyMeter, value: number) {
    if (value > 500) {
      context.changeState(new WarningState());
    }
  }
}
