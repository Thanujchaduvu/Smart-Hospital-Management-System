import { useEffect, useState } from "react";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import DashboardCard from "../../components/cards/DashboardCard";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    staff: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await api.get("/admin/dashboard");

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar title="Admin Dashboard" />

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <DashboardCard
              title="Patients"
              value={stats.patients}
              color="#2563eb"
            />

            <DashboardCard
              title="Doctors"
              value={stats.doctors}
              color="#16a34a"
            />

            <DashboardCard
              title="Staff"
              value={stats.staff}
              color="#9333ea"
            />
          </div>
        </div>
      </div>
    </div>
  );
}