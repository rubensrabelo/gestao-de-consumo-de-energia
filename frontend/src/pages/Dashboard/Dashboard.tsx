import { useParams } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      <p>Medidor selecionado:</p>
      <strong>{id}</strong>
    </div>
  );
}
