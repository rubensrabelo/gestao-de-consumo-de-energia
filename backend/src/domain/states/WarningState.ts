import { EnergyMeter } from "../entities/EnergyMeter";
import { ConsumptionState } from "./ConsumptionState";
import { ConsumptionStateType } from "./enums/ConsumptionStateType";

export class WarningState implements ConsumptionState {
  handle(_context: EnergyMeter, value: number): ConsumptionStateType | null {
    if (value > 1000) {
      return ConsumptionStateType.CRITICAL;
    }
    return null;
  }
}
