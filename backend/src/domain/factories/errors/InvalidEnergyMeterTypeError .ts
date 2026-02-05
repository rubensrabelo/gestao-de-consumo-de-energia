import { DomainError } from "../../../application/services/errors/DomainError";

export class InvalidEnergyMeterTypeError extends DomainError {
  constructor(type: string, availableTypes: string[]) {
    super(
      `Invalid energy meter type: '${type}'. Available types: ${availableTypes.join(", ")}`
    );
  }
}
