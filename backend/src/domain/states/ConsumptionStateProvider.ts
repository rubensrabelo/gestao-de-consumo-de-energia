import { ConsumptionState } from "./ConsumptionState";
import { ConsumptionStateType } from "./enums/ConsumptionStateType";
import { NormalState } from "./NormalState";
import { WarningState } from "./WarningState";
import { CriticalState } from "./CriticalState";

export class ConsumptionStateProvider {
  private static readonly states: Record<
    ConsumptionStateType,
    ConsumptionState
  > = {
    [ConsumptionStateType.NORMAL]: new NormalState(),
    [ConsumptionStateType.WARNING]: new WarningState(),
    [ConsumptionStateType.CRITICAL]: new CriticalState()
  };

  static get(type: ConsumptionStateType): ConsumptionState {
    return this.states[type];
  }
}
