import { useState } from "react";
import styles from "./RegisterReadingModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: number) => void;
}

export function RegisterReadingModal({
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Registrar consumo</h2>

        <label>Consumo (kWh)</label>
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.confirm}
            onClick={() => onConfirm(Number(value))}
            disabled={!value}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
