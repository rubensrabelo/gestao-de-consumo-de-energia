import { http } from "../base/http";

interface RegisterReadingPayload {
  meterId: string;
  value: number;
}

export async function registerReading(
  data: RegisterReadingPayload
): Promise<void> {
  await http("energy/reading", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
