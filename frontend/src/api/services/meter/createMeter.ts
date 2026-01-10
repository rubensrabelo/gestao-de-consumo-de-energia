import { http } from "../base/http";

import type { Meter } from "../../../types/domain/Meter";
import type { MeterForm } from "../../../types/domain/MeterForm";

export function createMeter(data: MeterForm) {
  return http<Meter>("energy/meter", {
    method: "POST",
    body: JSON.stringify(data),
  });
}