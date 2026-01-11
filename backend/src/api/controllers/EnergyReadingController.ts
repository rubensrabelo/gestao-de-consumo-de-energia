import { Request, Response } from "express";
import { EnergyReadingService } from "../../application/services/EnergyReadingService";
import { AppError } from "../../shared/errors/AppError";

export class EnergyReadingController {
  constructor(private service: EnergyReadingService) {}

  async registerReading(req: Request, res: Response): Promise<Response> {
    try {
      const { meterId, value } = req.body;
      await this.service.registerReading(meterId, value);
      return res.status(201).json({ message: "Energy reading registered successfully" });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof AppError)
      return res.status(error.statusCode).json({ message: error.message });

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
