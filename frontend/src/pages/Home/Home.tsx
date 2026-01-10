import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllMeters } from "../../api/services/meter/getAllMeters";
import { createMeter } from "../../api/services/meter/createMeter";

import type { EnergyMeter } from "../../types/domain/Meter";
import type { EnergyMeterType } from "../../types/enums/MeterTypeEnum";

import { CreateMeterModal } from "./components/CreateMeterModal/CreateMeterModal";
import { MeterCard } from "./components/MeterCard/MeterCard";

import styles from "./Home.module.css";

export default function Home() {
  const [meters, setMeters] = useState<EnergyMeter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  async function loadMeters() {
    const data = await getAllMeters();
    setMeters(data);
  }

  async function handleCreate(type: EnergyMeterType) {
    await createMeter({ type });
    setIsModalOpen(false);
    loadMeters();
  }

  useEffect(() => {
    loadMeters();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Medidores de Energia</h1>
        <button onClick={() => setIsModalOpen(true)}>
          Novo medidor
        </button>
      </header>

      <div className={styles.list}>
        {meters.map((meter) => (
          <MeterCard
            key={meter.id}
            meter={meter}
            onClick={() => navigate(`/dashboard/${meter.id}`)}
          />
        ))}
      </div>

      <CreateMeterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreate}
      />
    </div>
  );
}
