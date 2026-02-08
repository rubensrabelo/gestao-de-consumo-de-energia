import { Request, Response } from "express";
import { IEnergyReadingService } from "../../application/services/IEnergyReadingService";

export class EnergyReadingController {
  constructor(private service: IEnergyReadingService) { }

  async registerReading(req: Request, res: Response): Promise<Response> {
    const { meterId, value } = req.body;
    await this.service.registerReading(meterId, value);
    return res.status(201).json({ message: "Energy reading registered successfully" });
  }
}
