import { http } from "../base/http";
import type { EnergyMeterForm } from "../../../types/domain/MeterForm";

export async function createMeter(
  data: EnergyMeterForm
): Promise<void> {
  await http<void>("energy/meter", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
