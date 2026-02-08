import { Request, Response } from "express";
import { ValidationError } from "../../shared/errors/ValidationError";
import { IDashboardService } from "../../application/services/IDashboardService";

export class DashboardController {
  constructor(private dashboardService: IDashboardService) {}

  async show(req: Request, res: Response): Promise<Response> {
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
