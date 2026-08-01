import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

import DashboardCards from "../../components/patient/DashboardCards";
import QuickActions from "../../components/patient/QuickActions";
import UpcomingAppointment from "../../components/patient/UpcomingAppointment";
import PrescriptionWidget from "../../components/patient/PrescriptionWidget";
import LabReportWidget from "../../components/patient/LabReportWidget";
import BillingWidget from "../../components/patient/BillingWidget";
import NotificationWidget from "../../components/patient/NotificationWidget";
import HealthSummary from "../../components/patient/HealthSummary";
import RecentActivity from "../../components/patient/RecentActivity";
import AIFloatingButton from "../../components/ai/AIFloatingButton";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    appointments: [],
    prescriptions: [],
    reports: [],
    bills: [],
    pharmacyOrders: [],
    notifications: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        appointments,
        prescriptions,
        reports,
        bills,
      ] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL}/api/patient/appointments`,
          { headers }
        ),

        axios.get(
          `${import.meta.env.VITE_API_URL}/api/patient/prescriptions`,
          { headers }
        ),

        axios.get(
          `${import.meta.env.VITE_API_URL}/api/patient/lab-reports`,
          { headers }
        ),

        axios.get(
          `${import.meta.env.VITE_API_URL}/api/patient/bills`,
          { headers }
        ),
      ]);

      setDashboard({
        appointments:
          appointments.data.appointments || [],

        prescriptions:
          prescriptions.data.prescriptions || [],

        reports:
          reports.data.reports || [],

        bills:
          bills.data.bills || [],

        pharmacyOrders: [],

        notifications: [],
      });

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="patient" />

      <div className="flex-1">

        <Navbar title="Patient Dashboard" />

        <div className="p-8">

          <DashboardCards
            dashboard={dashboard}
            loading={loading}
          />

          <QuickActions />

          <UpcomingAppointment
            appointments={dashboard.appointments}
          />

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            <PrescriptionWidget
              prescriptions={dashboard.prescriptions}
            />

            <LabReportWidget
              reports={dashboard.reports}
            />

            <BillingWidget
              bills={dashboard.bills}
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <NotificationWidget
              notifications={dashboard.notifications}
            />

            <HealthSummary />

          </div>

          <RecentActivity />

        </div>

      </div>

      <AIFloatingButton />

    </div>
  );
}