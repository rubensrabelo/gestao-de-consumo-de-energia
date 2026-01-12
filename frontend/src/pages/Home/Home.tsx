import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMeters } from "./hooks/useMeters";
import { CreateMeterModal } from "./components/CreateMeterModal/CreateMeterModal";
import { MeterCard } from "./components/MeterCard/MeterCard";

import styles from "./Home.module.css";

export default function Home() {
  const { meters, createNewMeter } = useMeters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
        onConfirm={async (type) => {
          await createNewMeter(type);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
