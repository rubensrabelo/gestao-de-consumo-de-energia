import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicLayout from "../layouts/PublicLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
