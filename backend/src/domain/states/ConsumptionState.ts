import { EnergyMeter } from "../entities/EnergyMeter";
import { ConsumptionStateType } from "./enums/ConsumptionStateType";

export interface ConsumptionState {
  handle(
    context: EnergyMeter,
    value: number
  ): ConsumptionStateType | null;
}
