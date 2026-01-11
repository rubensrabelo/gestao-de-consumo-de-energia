import { EnergyMeter } from "../entities/EnergyMeter";
import { ConsumptionState } from "./ConsumptionState";
import { ConsumptionStateType } from "./enums/ConsumptionStateType";

export class NormalState implements ConsumptionState {
  handle(_context: EnergyMeter, value: number): ConsumptionStateType | null {
    if (value > 500) {
      return ConsumptionStateType.WARNING;
    }
    return null;
  }
}
