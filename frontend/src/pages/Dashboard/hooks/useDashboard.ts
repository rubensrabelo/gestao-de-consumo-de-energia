import { useEffect, useState, useCallback } from "react";
import { registerReading } from "../../../api/services/meter/registerReading";
import type { EnergyDashboard } from "../../../types/dashboard/EnergyDashboard";
import { getDashboard } from "../../../api/services/dashboard/getDashboard";

export function useDashboard(meterId: string) {
  const [dashboard, setDashboard] = useState<EnergyDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboard(meterId);
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }, [meterId]);

  async function addReading(value: number) {
    await registerReading({ meterId, value });
    await loadDashboard();
  }

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    loading,
    addReading,
  };
}
