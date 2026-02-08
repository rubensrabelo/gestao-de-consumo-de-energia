import { Request, Response } from "express";
import { IEnergyMeterService } from "../../application/services/IEnergyMeterService";

export class EnergyMeterController {
  constructor(private service: IEnergyMeterService) { }

  async createMeter(req: Request, res: Response): Promise<Response> {
    const { type } = req.body;
    const meter = await this.service.createMeter(type);
    return res.status(201).json(meter);
  }

  async getAllMeters(req: Request, res: Response): Promise<Response> {
    const meters = await this.service.getAllMeters();
    return res.status(200).json(meters);
  }
}
