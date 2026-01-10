import { useState, useEffect } from "react";

import { apiFacade } from "../api/EnergyApiFacade";

import type { EnergyDashboard } from "../types/Energy";

export function useEnergyData(meterId: string) {
    const [data, setData] = useState<EnergyDashboard | null>(null);

    useEffect(() => {
        if (!meterId) return;
        apiFacade.getDashboard(meterId).then((res: EnergyDashboard) => {
            setData(res);
        });
    }, [meterId]);

    return data;
}
