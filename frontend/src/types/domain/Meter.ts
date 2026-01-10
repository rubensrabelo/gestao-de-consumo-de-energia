import type { MeterType } from "../enums/MeterTypeEnum";

export interface Meter {
  id: string;
  type: MeterType;
  createdAt: string;
}