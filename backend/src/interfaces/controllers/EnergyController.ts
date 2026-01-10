import { Request, Response } from "express";
import { EnergyManagementFacade } from "../../domain/facade/EnergyManagementFacade";

export class EnergyController {
  private facade = new EnergyManagementFacade();

  registerReading(req: Request, res: Response) {
    const { meterId, value } = req.body;
    this.facade.registerReading(meterId, value);
    return res.status(201).json({ message: "Reading registered" });
  }
}
