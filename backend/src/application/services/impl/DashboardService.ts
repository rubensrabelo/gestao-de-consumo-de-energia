import type { IEnergyMeterRepository } from "../../../infra/repositories/IEnergyMeterRepository";
import type { IDashboardRepository } from "../../../infra/repositories/IDashboardRepository";
import { ValidationError } from "../../../shared/errors/ValidationError";
import { MeterNotFoundError } from "../errors/MeterNotFoundError";
import { IDashboardService } from "../IDashboardService";
import { MeterDashboardResponse } from "../../../types/MeterDashboardResponse";

export class DashboardService implements IDashboardService {
  constructor(
    private dashboardRepository: IDashboardRepository,
    private meterRepository: IEnergyMeterRepository
  ) {}

  async getMeterDashboard(meterId: string): Promise<MeterDashboardResponse> {
    if (!meterId) {
      throw new ValidationError("Meter ID is required");
    }

    const meter = await this.meterRepository.findById(meterId);

    if (!meter) {
      throw new MeterNotFoundError(meterId);
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
        date: item.date,
        total: item.total
      }))
    };
  }
}
