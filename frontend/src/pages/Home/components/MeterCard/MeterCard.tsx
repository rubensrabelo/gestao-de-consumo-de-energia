import type { EnergyMeter } from "../../../../types/domain/Meter";
import {
  ENERGY_METER_TYPE,
  type EnergyMeterType,
} from "../../../../types/enums/MeterTypeEnum";
import styles from "./MeterCard.module.css";

interface MeterCardProps {
  meter: EnergyMeter;
  onClick: () => void;
}

const METER_TYPE_LABEL: Record<EnergyMeterType, string> = {
  [ENERGY_METER_TYPE.RESIDENTIAL]: "Residencial",
  [ENERGY_METER_TYPE.SCHOOL]: "Escolar",
};

export function MeterCard({ meter, onClick }: MeterCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <strong>{METER_TYPE_LABEL[meter.type]}</strong>
      <span>ID: {meter.id}</span>
    </div>
  );
}
