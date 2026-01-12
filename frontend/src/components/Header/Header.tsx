import { Zap } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Zap className={styles.icon} size={22} />
        <span className={styles.title}>Energy Monitor</span>
      </div>
    </header>
  );
}
