import { useEffect, useState } from "react";
import { getAllMeters } from "../../../api/services/meter/getAllMeters";
import { createMeter } from "../../../api/services/meter/createMeter";
import type { EnergyMeter } from "../../../types/domain/Meter";
import type { EnergyMeterType } from "../../../types/enums/MeterTypeEnum";

export function useMeters() {
  const [meters, setMeters] = useState<EnergyMeter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMeters() {
    setIsLoading(true);
    const data = await getAllMeters();
    setMeters(data);
    setIsLoading(false);
  }

  async function createNewMeter(type: EnergyMeterType) {
    await createMeter({ type });
    await loadMeters();
  }

  useEffect(() => {
    loadMeters();
  }, []);

  return {
    meters,
    isLoading,
    createNewMeter,
  };
}
