import type { EnergyMeterForm } from "../../../types/domain/MeterForm";

export async function createMeter(data: EnergyMeterForm): Promise<void> {
  await fetch("http://localhost:3333/energy/meter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
