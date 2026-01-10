import mongoose, { Schema, Document } from "mongoose";

interface EnergyReadingDocument extends Document {
  meterId: string;
  value: number;
  timestamp: Date;
}

const EnergyReadingSchema = new Schema<EnergyReadingDocument>({
  meterId: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const EnergyReadingModel = mongoose.model<EnergyReadingDocument>(
  "EnergyReading"
);

export class DashboardRepository {
  async getConsumptionSummary(meterId: string) {
    const result = await EnergyReadingModel.aggregate([
      {
        $match: {
          meterId
        }
      },
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

  async getDailyConsumption(meterId: string) {
    return EnergyReadingModel.aggregate([
      {
        $match: {
          meterId
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$timestamp"
              }
            }
          },
          total: { $sum: "$value" }
        }
      },
      {
        $sort: { "_id.day": 1 }
      }
    ]);
  }
}
