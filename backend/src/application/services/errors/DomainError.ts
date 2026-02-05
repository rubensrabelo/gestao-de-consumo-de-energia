import { AppError } from "../../../shared/errors/AppError";

export abstract class DomainError extends AppError {
  constructor(message: string, statusCode = 422) {
    super(message, statusCode);
  }
}
