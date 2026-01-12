import { useNotifications } from "../../context/NotificationContext";
import styles from "./NotificationToast.module.css";

export function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className={styles.container}>
      {notifications.map((n) => (
        <div key={n.id} className={styles.toast}>
          <span>{n.message}</span>
          <button className={styles.closeBtn} onClick={() => removeNotification(n.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
