import { Request, Response } from "express";
import { DashboardService } from "../../application/services/DashboardService";
import { ValidationError } from "../../shared/errors/ValidationError";

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async show(req: Request, res: Response) {
    const { meterId } = req.params;

    if (Array.isArray(meterId)) {
      throw new ValidationError(
        "meterId must be a single string parameter"
      );
    }

    const dashboard =
      await this.dashboardService.getMeterDashboard(meterId);

    return res.status(200).json(dashboard);
  }
}
