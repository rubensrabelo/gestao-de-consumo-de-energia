export interface EnergyReading {
    date: string;
    total: number;
}

export interface EnergyDashboard {
    meterId: string;
    meterType: "RESIDENTIAL" | "SCHOOL";
    totalConsumption: number;
    averageConsumption: number;
    dailyConsumption: EnergyReading[];
}
