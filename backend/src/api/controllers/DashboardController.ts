import { Request, Response } from "express";
import { DashboardService } from "../../application/services/DashboardService";
import { AppError } from "../../shared/errors/AppError";

export class DashboardController {
  private dashboardService = new DashboardService();

  async show(req: Request, res: Response) {
    const { meterId } = req.params;

    if (Array.isArray(meterId)) {
      throw new AppError("Invalid meter ID format", 400);
    }

    const dashboard =
      await this.dashboardService.getMeterDashboard(meterId);

    return res.status(200).json(dashboard);
  }
}
