import { EnergyMeter } from "../entities/EnergyMeter";
import { ConsumptionState } from "./ConsumptionState";
import { ConsumptionStateType } from "./enums/ConsumptionStateType";

export class CriticalState implements ConsumptionState {
  handle(context: EnergyMeter): ConsumptionStateType | null {
    context.notify("Critical consumption level reached!");
    return null;
  }
}
