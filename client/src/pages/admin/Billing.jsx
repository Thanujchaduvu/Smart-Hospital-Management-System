import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Billing() {
  const token = localStorage.getItem("token");

  // =====================================
  // MAIN DATA
  // =====================================

  const [loading, setLoading] = useState(true);

  const [bills, setBills] = useState([]);

  const [summary, setSummary] = useState({});

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const [appointments, setAppointments] = useState([]);

  // =====================================
  // SEARCH & FILTER
  // =====================================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  // =====================================
  // CREATE BILL MODAL
  // =====================================

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    appointment_id: "",
    patient_id: "",
    doctor_id: "",

    consultation_fee: 0,
    lab_fee: 0,
    medicine_fee: 0,

    payment_method: "Cash",
  });

  // =====================================
  // AUTO TOTAL
  // =====================================

  const totalAmount = useMemo(() => {
    return (
      Number(formData.consultation_fee || 0) +
      Number(formData.lab_fee || 0) +
      Number(formData.medicine_fee || 0)
    );
  }, [formData]);

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadBilling();
  }, []);

  // =====================================
  // LOAD EVERYTHING
  // =====================================

  const loadBilling = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchBills(),
        fetchSummary(),
        fetchRevenue(),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setFormData({
      appointment_id: "",
      patient_id: "",
      doctor_id: "",

      consultation_fee: 0,
      lab_fee: 0,
      medicine_fee: 0,

      payment_method: "Cash",
    });
  };

// =====================================
// FETCH ALL BILLS
// =====================================

const fetchBills = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/billing`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBills(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

// =====================================
// FETCH SUMMARY
// =====================================

const fetchSummary = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/billing/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSummary(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};

// =====================================
// FETCH MONTHLY REVENUE
// =====================================

const fetchRevenue = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/billing/monthly`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMonthlyRevenue(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

// =====================================
// FETCH APPOINTMENTS
// =====================================

const fetchAppointments = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/billing/appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAppointments(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

// =====================================
// CREATE BILL
// =====================================

const createBill = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/billing`,
      {
        ...formData,
        amount: totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowModal(false);

    resetForm();

    loadBilling();

  } catch (err) {
    console.error(err);
    alert("Failed to create bill.");
  }
};

// =====================================
// DELETE BILL
// =====================================

const deleteBill = async (id) => {
  if (!window.confirm("Delete this bill?")) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/billing/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadBilling();

  } catch (err) {
    console.error(err);
    alert("Failed to delete bill.");
  }
};

// =====================================
// UPDATE STATUS
// =====================================

const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/billing/${id}`,
      {
        payment_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadBilling();

  } catch (err) {
    console.error(err);
  }
};

// =====================================
// CHART DATA
// =====================================

const chartData = {
  labels: monthlyRevenue.map((item) => item.month),

  datasets: [
    {
      label: "Revenue",

      data: monthlyRevenue.map((item) =>
        Number(item.revenue)
      ),

      backgroundColor: "#2563eb",
      borderRadius: 8,
    },
  ],
};

// =====================================
// FILTERED BILLS
// =====================================

const filteredBills = bills.filter((bill) => {

  const matchesSearch =
    bill.patient_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    bill.invoice_number
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    bill.payment_status === filter;

  return matchesSearch && matchesFilter;
});

// =====================================
// LOADING
// =====================================

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen text-xl font-semibold">
      Loading Billing Dashboard...
    </div>
  );
}

return (
  <div className="flex min-h-screen bg-gray-100">

    <Sidebar role="admin" />

    <div className="flex-1">

      <Navbar title="Billing Management" />

      <div className="p-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Billing Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage invoices, payments and revenue.
            </p>

          </div>

          <button
            onClick={async () => {
              await fetchAppointments();
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow mt-4 lg:mt-0"
          >
            + Create Bill
          </button>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <Card
            title="Revenue"
            value={`₹${summary.total_revenue || 0}`}
          />

          <Card
            title="Bills"
            value={summary.total_bills || 0}
          />

          <Card
            title="Paid"
            value={summary.paid_bills || 0}
          />

          <Card
            title="Pending"
            value={summary.pending_bills || 0}
          />

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow p-5 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search Patient / Invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-4 py-3"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

        {/* Revenue Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-xl font-semibold mb-6">
            Monthly Revenue
          </h2>

          <div className="h-96">

            <Bar
              data={chartData}
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

        {/* Bills Table */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="px-6 py-4 border-b">

            <h2 className="text-xl font-semibold">
              Billing Records
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Invoice
                  </th>

                  <th className="px-4 py-3 text-left">
                    Patient
                  </th>

                  <th className="px-4 py-3 text-left">
                    Doctor
                  </th>

                  <th className="px-4 py-3 text-left">
                    Amount
                  </th>

                  <th className="px-4 py-3 text-left">
                    Payment
                  </th>

                  <th className="px-4 py-3 text-center">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBills.length === 0 ? (

                  <tr>

                    <td
                      colSpan={7}
                      className="text-center py-10 text-gray-500"
                    >
                      No bills found.
                    </td>

                  </tr>

                ) : (

                  filteredBills.map((bill) => (

                    <tr
                      key={bill.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">
                        {bill.invoice_number}
                      </td>

                      <td className="px-4 py-4">
                        {bill.patient_name}
                      </td>

                      <td className="px-4 py-4">
                        {bill.doctor_name}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        ₹{bill.amount}
                      </td>

                      <td className="px-4 py-4">
                        {bill.payment_method || "-"}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <StatusBadge
                          status={bill.payment_status}
                        />
                      </td>

                      <td className="px-4 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              updateStatus(
                                bill.id,
                                "Paid"
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Paid
                          </button>

                          <button
                            onClick={() =>
                              deleteBill(
                                bill.id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ============================
    CREATE BILL MODAL
============================= */}

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Create New Bill
        </h2>

        <button
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="text-gray-500 hover:text-red-600 text-2xl"
        >
          ✕
        </button>

      </div>

      <div className="grid grid-cols-2 gap-5">

        {/* Appointment */}

        <div className="col-span-2">

          <label className="block font-medium mb-2">
            Appointment
          </label>

          <select
            value={formData.appointment_id}
            onChange={(e) => {

              const appointment =
                appointments.find(
                  item =>
                    item.id === Number(e.target.value)
                );

              if (!appointment) return;

              setFormData({
                ...formData,

                appointment_id: appointment.id,

                patient_id: appointment.patient_id,

                doctor_id: appointment.doctor_id,
              });

            }}
            className="w-full border rounded-lg px-4 py-3"
          >

            <option value="">
              Select Appointment
            </option>

            {appointments.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                #{item.id} - {item.patient_name}
              </option>

            ))}

          </select>

        </div>

        {/* Consultation */}

        <div>

          <label className="block font-medium mb-2">
            Consultation Fee
          </label>

          <input
            type="number"
            value={formData.consultation_fee}
            onChange={(e) =>
              setFormData({
                ...formData,
                consultation_fee: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Lab */}

        <div>

          <label className="block font-medium mb-2">
            Laboratory Fee
          </label>

          <input
            type="number"
            value={formData.lab_fee}
            onChange={(e) =>
              setFormData({
                ...formData,
                lab_fee: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Medicine */}

        <div>

          <label className="block font-medium mb-2">
            Medicine Fee
          </label>

          <input
            type="number"
            value={formData.medicine_fee}
            onChange={(e) =>
              setFormData({
                ...formData,
                medicine_fee: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Payment */}

        <div>

          <label className="block font-medium mb-2">
            Payment Method
          </label>

          <select
            value={formData.payment_method}
            onChange={(e) =>
              setFormData({
                ...formData,
                payment_method: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          >

            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Insurance</option>

          </select>

        </div>

        {/* Total */}

        <div className="col-span-2">

          <label className="block font-medium mb-2">
            Total Amount
          </label>

          <input
            readOnly
            value={`₹ ${totalAmount}`}
            className="w-full bg-gray-100 border rounded-lg px-4 py-3 font-bold text-lg"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={createBill}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create Bill
        </button>

      </div>

    </div>

  </div>
)}
      </div>

    </div>

  </div>
);



// =============================================
// KPI CARD COMPONENT
// =============================================

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-all">

      <h3 className="text-sm uppercase text-gray-500 font-semibold tracking-wide">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-gray-800 mt-3">
        {value}
      </h2>

    </div>
  );
}

// =============================================
// STATUS BADGE COMPONENT
// =============================================

function StatusBadge({ status }) {

  let classes =
    "bg-gray-100 text-gray-700";

  switch (status) {

    case "Paid":
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