import { DashboardRepository } from "../../infra/repositories/DashboardRepository";
import { EnergyMeterRepository } from "../../infra/repositories/EnergyMeterRepository";
import { AppError } from "../../shared/errors/AppError";

export class DashboardService {
  constructor(
    private dashboardRepository: DashboardRepository,
    private meterRepository: EnergyMeterRepository
  ) {}

  async getMeterDashboard(meterId: string) {
    if (!meterId) {
      throw new AppError("Meter ID is required");
    }

    const meter = await this.meterRepository.findById(meterId);

    if (!meter) {
      throw new AppError("Energy meter not found", 404);
    }

    const summary =
      await this.dashboardRepository.getConsumptionSummary(meterId);

    const daily =
      await this.dashboardRepository.getDailyConsumption(meterId);

    return {
      meterId,
      meterType: meter.type,
      totalConsumption: summary.totalConsumption,
      averageConsumption: Number(
        summary.averageConsumption.toFixed(2)
      ),
      dailyConsumption: daily.map(item => ({
        date: item._id.day,
        total: item.total
      }))
    };
  }
}
