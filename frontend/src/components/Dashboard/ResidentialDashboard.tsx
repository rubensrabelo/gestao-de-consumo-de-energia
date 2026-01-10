import { useEnergyData } from "../../hooks/useEnergyData";
import { ConsumptionChart } from "../Chart/ConsumptionChart";
import "./Dashboard.css";
import type { EnergyDashboard } from "../../types/Energy";

export function ResidentialDashboard() {
    const meterId = "69627e2b92e61cc6ef8de66b";
    const dashboardData: EnergyDashboard | null = useEnergyData(meterId);

    if (!dashboardData) return <div className="loading">Loading...</div>;

    return (
        <div className="dashboard-container">
            <h2>Residential Dashboard</h2>
            <div className="dashboard-summary">
                <p>Total Consumption: {dashboardData.totalConsumption} kWh</p>
                <p>Average Consumption: {dashboardData.averageConsumption} kWh</p>
            </div>
            <ConsumptionChart
                data={dashboardData.dailyConsumption.map(d => ({
                    day: d.date,
                    total: d.total
                }))}
            />
        </div>
    );
}
