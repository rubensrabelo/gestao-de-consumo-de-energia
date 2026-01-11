import { ConsumptionState } from "../../states/ConsumptionState";
import { ConsumptionStateProvider } from "../../states/ConsumptionStateProvider";
import { ConsumptionStateType } from "../../states/enums/ConsumptionStateType";

export class EnergyMeterState {
  private state: ConsumptionState;

  constructor() {
    this.state = ConsumptionStateProvider.get(
      ConsumptionStateType.NORMAL
    );
  }

  get(): ConsumptionState {
    return this.state;
  }

  change(type: ConsumptionStateType): void {
    this.state = ConsumptionStateProvider.get(type);
  }
}
