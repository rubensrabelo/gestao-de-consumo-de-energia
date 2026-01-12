import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useDashboard } from "./hooks/useDashboard";
import { SummaryCard } from "./components/SummaryCard/SummaryCard";
import { ConsumptionChart } from "./components/ConsumptionChart/ConsumptionChart";
import { RegisterReadingModal } from "./components/RegisterReadingModal/RegisterReadingModal";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { meterId } = useParams<{ meterId: string }>();
  const { dashboard, loading, addReading } = useDashboard(meterId!);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Voltar para a tela inicial
      </Link>


      <header className={styles.header}>
        <div>
          <h1>Dashboard de Consumo</h1>
          <span>{dashboard?.meterType}</span>
        </div>

        <button onClick={() => setModalOpen(true)}>
          Registrar leitura
        </button>
      </header>

      {dashboard && dashboard.dailyConsumption.length > 0 ? (
        <>
          <section className={styles.cards}>
            <SummaryCard
              title="Consumo Total"
              value={`${dashboard.totalConsumption} kWh`}
            />
            <SummaryCard
              title="Média Diária"
              value={`${dashboard.averageConsumption} kWh`}
            />
          </section>

          <ConsumptionChart data={dashboard.dailyConsumption} />
        </>
      ) : (
        <div className={styles.empty}>
          Ainda não existem dados de consumo para este medidor.
        </div>
      )}

      <RegisterReadingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={async (value) => {
          await addReading(value);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
