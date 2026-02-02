import type { IEnergyMeterRepository } from "../../infra/repositories/IEnergyMeterRepository";
import type { IDashboardRepository } from "../../infra/repositories/IDashboardRepository";
import { AppError } from "../../shared/errors/AppError";

export class DashboardService {
  constructor(
    private dashboardRepository: IDashboardRepository,
    private meterRepository: IEnergyMeterRepository
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
        date: item.day,
        total: item.total
      }))
    };
  }
}
