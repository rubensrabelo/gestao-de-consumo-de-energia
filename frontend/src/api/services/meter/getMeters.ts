import { http } from "../base/http";

import type { Meter } from "../../../types/domain/Meter";

export function getMeters() {
  return http<Meter[]>("energy/meters");
}
