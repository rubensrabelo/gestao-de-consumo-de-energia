import type { EnergyMeter } from "../../../../types/domain/Meter";
import {
  ENERGY_METER_TYPE,
  type EnergyMeterType,
} from "../../../../types/enums/MeterTypeEnum";
import styles from "./MeterCard.module.css";

interface Props {
  meter: EnergyMeter;
  onClick: () => void;
}

function translateType(type: EnergyMeterType) {
  return type === ENERGY_METER_TYPE.RESIDENTIAL
    ? "Residencial"
    : "Escolar";
}

export function MeterCard({ meter, onClick }: Props) {
  return (
    <div className={styles.card} onClick={onClick}>
      <strong>{translateType(meter.type)}</strong>
      <span>ID: {meter.id}</span>
    </div>
  );
}
