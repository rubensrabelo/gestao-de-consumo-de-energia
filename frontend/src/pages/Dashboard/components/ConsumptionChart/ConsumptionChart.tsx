import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import styles from "./ConsumptionChart.module.css";

interface ChartProps {
  data: {
    date: string;
    total: number;
  }[];
}

export function ConsumptionChart({ data }: ChartProps) {
  return (
    <div className={styles.container}>
      <h2>Consumo Diário</h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
