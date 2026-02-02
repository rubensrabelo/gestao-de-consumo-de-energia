import { ConsumptionSummaryType } from "../../../types/ConsumptionSummaryType";
import { DailyConsumptionType } from "../../../types/DailyConsumptionType";
import { IDashboardRepository } from "../IDashboardRepository";
import { EnergyReadingModel } from "../models/EnergyReading";

interface IMongoDailyAggregation {
  _id: { day: string };
  total: number;
}

export class MongoDashboardRepository implements IDashboardRepository {
  async getConsumptionSummary(meterId: string): Promise<ConsumptionSummaryType> {
    const result = await EnergyReadingModel.aggregate([
      { $match: { meterId } },
      {
        $group: {
          _id: null,
          totalConsumption: { $sum: "$value" },
          averageConsumption: { $avg: "$value" }
        }
      }
    ]);
    return result[0] || { totalConsumption: 0, averageConsumption: 0 };
  }

  async getDailyConsumption(meterId: string): Promise<DailyConsumptionType[]> {
    const result = await EnergyReadingModel.aggregate([
      { $match: { meterId } },
      { $group: {
          _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } } },
          total: { $sum: "$value" }
      }},
      { $sort: { "_id.day": 1 } }
    ]) as IMongoDailyAggregation[]; 

    return result.map((item: IMongoDailyAggregation) => ({
      day: item._id.day,
      total: item.total
    }));
  }
}
