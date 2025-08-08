import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cafe from "./pages/Cafe";
import Dashboard from "./pages/Dashboard";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import CafeManage from "./pages/CafeManage";
import MomentManage from "./pages/MomentManage";
import CreateCafe from "./pages/CreateCafe";
import UpdateCafe from "./pages/UpdateCafe";

function App() {
  return (
    <Routes>
      {/* Public pages use PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cafe" element={<Cafe />} />
      </Route>

      {/* Dashboard pages use DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cafe-manage" element={<CafeManage />} />
        <Route path="/create-cafe" element={<CreateCafe />} />
        <Route path="/update-cafe/:id" element={<UpdateCafe />} />
        <Route path="/moment-manage" element={<MomentManage />} />
      </Route>
    </Routes>
  );
}

export default App;
