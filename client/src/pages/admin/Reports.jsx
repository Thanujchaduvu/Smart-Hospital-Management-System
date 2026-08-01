import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Reports() {

  const token = localStorage.getItem("token");

  const [summary, setSummary] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      setLoading(true);

      await Promise.all([
        fetchSummary(),
        fetchStatus(),
        fetchDepartmentReport(),
        fetchMonthlyReport(),
        fetchRecentAppointments(),
      ]);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // ===========================
  // SUMMARY
  // ===========================

  const fetchSummary = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reports/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSummary(res.data.summary);

  };

  // ===========================
  // STATUS
  // ===========================

  const fetchStatus = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reports/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStatusData(res.data.data);

  };

  // ===========================
  // DEPARTMENT REPORT
  // ===========================

  const fetchDepartmentReport = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reports/departments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDepartmentData(res.data.data);

  };

  // ===========================
  // MONTHLY REPORT
  // ===========================

  const fetchMonthlyReport = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reports/monthly`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMonthlyData(res.data.data);

  };

  // ===========================
  // RECENT APPOINTMENTS
  // ===========================

  const fetchRecentAppointments = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/reports/recent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecentAppointments(res.data.data);

  };

  // ===========================
  // PIE DATA
  // ===========================

  const pieData = {
    labels: statusData.map((item) => item.status),

    datasets: [
      {
        label: "Appointments",
        data: statusData.map((item) => Number(item.count)),
      },
    ],
  };

  // ===========================
  // BAR DATA
  // ===========================

  const barData = {

    labels: departmentData.map(
      (item) => item.department
    ),

    datasets: [
      {
        label: "Appointments",

        data: departmentData.map(
          (item) => Number(item.appointments)
        ),
      },
    ],
  };

  // ===========================
  // LINE DATA
  // ===========================

  const lineData = {

    labels: monthlyData.map(
      (item) => item.month
    ),

    datasets: [
      {
        label: "Appointments",

        data: monthlyData.map(
          (item) => Number(item.appointments)
        ),

        borderWidth: 3,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // ===========================
  // EXPORT PDF
  // ===========================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Hospital Report",
      15,
      20
    );

    autoTable(doc, {

      startY: 30,

      head: [["Metric", "Value"]],

      body: [
        ["Doctors", summary.totalDoctors],
        ["Patients", summary.totalPatients],
        ["Departments", summary.totalDepartments],
        ["Appointments", summary.totalAppointments],
        ["Completed", summary.completed],
        ["Pending", summary.pending],
        ["Cancelled", summary.cancelled],
      ],

    });

    doc.save("Hospital_Report.pdf");

  };

  // ===========================
  // EXPORT EXCEL
  // ===========================

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        recentAppointments
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Appointments"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/octet-stream",
      }
    );

    saveAs(
      file,
      "Hospital_Report.xlsx"
    );

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Reports...
      </div>
    );
  }

return (
  <div className="flex min-h-screen bg-gray-100">

    <Sidebar role="admin" />

    <div className="flex-1">

      <Navbar title="Reports" />

      <div className="p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Hospital Reports & Analytics
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor hospital performance and appointment statistics.
            </p>

          </div>

          <div className="flex gap-3 mt-4 md:mt-0">

            <button
              onClick={exportPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Export PDF
            </button>

            <button
              onClick={exportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Export Excel
            </button>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          <Card
            title="Doctors"
            value={summary.totalDoctors}
          />

          <Card
            title="Patients"
            value={summary.totalPatients}
          />

          <Card
            title="Departments"
            value={summary.totalDepartments}
          />

          <Card
            title="Appointments"
            value={summary.totalAppointments}
          />

          <Card
            title="Completed"
            value={summary.completed}
          />

          <Card
            title="Pending"
            value={summary.pending}
          />

          <Card
            title="Cancelled"
            value={summary.cancelled}
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Pie Chart */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-6">
              Appointment Status
            </h2>

            <div className="h-80">

              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />

            </div>

          </div>

          {/* Department Chart */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-6">
              Appointments by Department
            </h2>

            <div className="h-80">

              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />

            </div>

          </div>

        </div>

        {/* Monthly Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-xl font-semibold mb-6">
            Monthly Appointment Trend
          </h2>

          <div className="h-96">

            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />

          </div>

        </div>

        {/* Recent Appointments */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="flex justify-between items-center px-6 py-4 border-b">

            <h2 className="text-xl font-semibold">
              Recent Appointments
            </h2>

            <span className="text-sm text-gray-500">
              Last 10 Records
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="px-5 py-3 text-left">
                    Patient
                  </th>

                  <th className="px-5 py-3 text-left">
                    Doctor
                  </th>

                  <th className="px-5 py-3 text-left">
                    Department
                  </th>

                  <th className="px-5 py-3 text-left">
                    Date
                  </th>

                  <th className="px-5 py-3 text-left">
                    Time
                  </th>

                  <th className="px-5 py-3 text-center">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentAppointments.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-500"
                    >
                      No appointments found.
                    </td>

                  </tr>

                ) : (

                  recentAppointments.map((appointment) => (

                    <tr
                      key={appointment.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-5 py-4">
                        {appointment.patient}
                      </td>

                      <td className="px-5 py-4">
                        {appointment.doctor}
                      </td>

                      <td className="px-5 py-4">
                        {appointment.department}
                      </td>

                      <td className="px-5 py-4">
                        {new Date(
                          appointment.appointment_date
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        {appointment.appointment_time}
                      </td>

                      <td className="px-5 py-4 text-center">

                        <StatusBadge
                          status={appointment.status}
                        />

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  </div>
);
// ============================================
// KPI Card Component
// ============================================

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border-l-4 border-blue-600">

      <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
        {title}
      </h3>

      <h2 className="text-4xl font-bold text-gray-800 mt-3">
        {value || 0}
      </h2>

    </div>
  );
}

// ============================================
// Status Badge Component
// ============================================

function StatusBadge({ status }) {

  let classes =
    "bg-gray-100 text-gray-700";

  switch (status) {

    case "Completed":
      classes =
        "bg-green-100 text-green-700";
      break;

    case "Pending":
      classes =
        "bg-yellow-100 text-yellow-700";
      break;

    case "Cancelled":
      classes =
        "bg-red-100 text-red-700";
      break;

    default:
      classes =
        "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}
}