import { Request, Response } from "express";
import { EnergyService } from "../../application/services/EnergyService";
import { AppError } from "../../shared/errors/AppError";

export class EnergyController {
  private service = new EnergyService();

  async createMeter(req: Request, res: Response): Promise<Response> {
    try {
      const { type } = req.body;

      const meter = await this.service.createMeter(type);

      return res.status(201).json(meter);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getAllMeters(req: Request, res: Response): Promise<Response> {
    try {
      const meters = await this.service.getAllMeters();
      return res.status(200).json(meters);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async registerReading(req: Request, res: Response): Promise<Response> {
    try {
      const { meterId, value } = req.body;

      await this.service.registerReading(meterId, value);

      return res.status(201).json({
        message: "Energy reading registered successfully"
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
