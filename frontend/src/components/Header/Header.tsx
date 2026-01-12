import { Library } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Library size={28} />
    </header>
  );
}
