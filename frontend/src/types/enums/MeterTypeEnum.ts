export const METER_TYPE = {
    RESIDENTIAL: "RESIDENTIAL",
    SCHOOL: "SCHOOL",
} as const;

export type MeterType = typeof METER_TYPE[keyof typeof METER_TYPE];