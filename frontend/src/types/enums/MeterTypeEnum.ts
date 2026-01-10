export const ENERGY_METER_TYPE = {
    RESIDENTIAL: "RESIDENTIAL",
    SCHOOL: "SCHOOL",
} as const;

export type EnergyMeterType = typeof ENERGY_METER_TYPE[keyof typeof ENERGY_METER_TYPE];