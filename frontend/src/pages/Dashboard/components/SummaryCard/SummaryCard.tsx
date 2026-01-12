import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
  title: string;
  value: string;
}

export function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className={styles.card}>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}
