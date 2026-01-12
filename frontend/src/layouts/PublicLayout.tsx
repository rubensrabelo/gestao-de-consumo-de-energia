import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import styles from "./PublicLayout.module.css";


function PublicLayout() {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;