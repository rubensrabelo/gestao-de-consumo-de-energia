export interface IEnergyReadingService {
  registerReading(meterId: string, value: number): Promise<void>;
}