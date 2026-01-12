import { createContext, useContext, useState, useEffect } from "react";
import type {  ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import ENV from "../config/envConfig";

export interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  removeNotification: () => {},
});

let socket: Socket;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket = io(ENV.API_BASE_URL);

    socket.on("notification", (message: string) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message }]);

      setTimeout(() => removeNotification(id), 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
