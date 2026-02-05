import { DomainError } from "./DomainError";

export class MeterNotFoundError extends DomainError {
  constructor(meterId: string) {
    super(
      `Energy meter with id '${meterId}' was not found`,
      404
    );
  }
}
