import { DomainError } from "./DomainError";


export class InvalidConsumptionValueError extends DomainError {
  constructor(value: number) {
    super(
      `Consumption value must be greater than zero. Received: ${value}`,
      422
    );
  }
}
