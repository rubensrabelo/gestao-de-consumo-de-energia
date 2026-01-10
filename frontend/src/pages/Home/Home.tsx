import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createMeter } from "../../api/services/meter/createMeter";
import { getAllMeters } from "../../api/services/meter/getAllMeters";

import type { EnergyMeter } from "../../types/domain/Meter";
import {
  ENERGY_METER_TYPE,
  type EnergyMeterType,
} from "../../types/enums/MeterTypeEnum";

import styles from "./Home.module.css";

export default function Home() {
  const [meters, setMeters] = useState<EnergyMeter[]>([]);
  const navigate = useNavigate();

  async function loadMeters() {
    const data = await getAllMeters();
    setMeters(data);
  }

  async function handleCreate(type: EnergyMeterType) {
    await createMeter({ type });
    loadMeters();
  }

  useEffect(() => {
    loadMeters();
  }, []);

  function translateType(type: EnergyMeterType) {
    switch (type) {
      case ENERGY_METER_TYPE.RESIDENTIAL:
        return "Residencial";
      case ENERGY_METER_TYPE.SCHOOL:
        return "Escolar";
      default:
        return type;
    }
  }

  return (
    <div className={styles.container}>
      <h1>Medidores de Energia</h1>

      <div className={styles.buttons}>
        <button
          onClick={() => handleCreate(ENERGY_METER_TYPE.RESIDENTIAL)}
        >
          Criar Residencial
        </button>

        <button
          onClick={() => handleCreate(ENERGY_METER_TYPE.SCHOOL)}
        >
          Criar Escolar
        </button>
      </div>

      <div className={styles.list}>
        {meters.map((meter) => (
          <div
            key={meter.id}
            className={styles.card}
            onClick={() => navigate(`/dashboard/${meter.id}`)}
          >
            <strong>{translateType(meter.type)}</strong>
            <span>ID: {meter.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
