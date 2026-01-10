export class EnergyReading {
  constructor(
    public readonly value: number,
    public readonly timestamp: Date = new Date()
  ) {}
}
