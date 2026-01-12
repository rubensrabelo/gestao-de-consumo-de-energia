import AppRouter from "./router/AppRouter";

import { NotificationProvider } from "./context/NotificationContext";
import { NotificationToast } from "./components/Notifications/NotificationToast";

import "./App.module.css";

export default function App() {
  return <>
    <NotificationProvider>
      <NotificationToast />
      <AppRouter />
    </NotificationProvider>
  </>;
}
