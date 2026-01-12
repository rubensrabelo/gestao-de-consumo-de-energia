import { useState } from "react";
import {
  ENERGY_METER_TYPE,
  type EnergyMeterType,
} from "../../../../types/enums/MeterTypeEnum";
import styles from "./CreateMeterModal.module.css";

interface CreateMeterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: EnergyMeterType) => void;
}

export function CreateMeterModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateMeterModalProps) {
  const [type, setType] = useState<EnergyMeterType>(
    ENERGY_METER_TYPE.RESIDENTIAL
  );

  if (!isOpen) return null;

  function handleConfirm() {
    onConfirm(type);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Criar medidor</h2>

        <label htmlFor="meterType">Tipo do medidor</label>
        <select
          id="meterType"
          value={type}
          onChange={(e) => setType(e.target.value as EnergyMeterType)}
        >
          <option value={ENERGY_METER_TYPE.RESIDENTIAL}>
            Residencial
          </option>
          <option value={ENERGY_METER_TYPE.SCHOOL}>
            Escolar
          </option>
        </select>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.confirm} onClick={handleConfirm}>
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
