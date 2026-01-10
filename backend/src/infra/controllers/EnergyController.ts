import { Request, Response } from "express";
import { EnergyManagementFacade } from "../../domain/facade/EnergyManagementFacade";

export class EnergyController {
  private facade = new EnergyManagementFacade();

  async registerReading(req: Request, res: Response) {
    const { meterId, value } = req.body;

    await this.facade.registerReading(meterId, value);

    return res.status(201).json({
      message: "Energy reading registered successfully"
    });
  }
}
