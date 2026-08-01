import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaCalendarCheck,
  FaSearch,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment.doctor_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.reason
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredAppointments(filtered);
  }, [search, appointments]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/patient/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments || []);
      setFilteredAppointments(res.data.appointments || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demoAppointments = [
        {
          id: 1,
          doctor_name: "Dr. Sharma",
          specialization: "Cardiology",
          appointment_date: "2026-08-10",
          appointment_time: "10:00 AM",
          reason: "Chest Pain",
          status: "Confirmed",
        },
        {
          id: 2,
          doctor_name: "Dr. Rajesh",
          specialization: "General Medicine",
          appointment_date: "2026-08-15",
          appointment_time: "11:30 AM",
          reason: "Fever",
          status: "Pending",
        },
      ];

      setAppointments(demoAppointments);
      setFilteredAppointments(demoAppointments);
    } finally {
      setLoading(false);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="My Appointments" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaCalendarCheck />
                My Appointments
              </h1>

              <p className="text-gray-500 mt-2">
                View all your booked appointments
              </p>
            </div>

            <div className="bg-blue-600 text-white rounded-xl px-6 py-4 text-center">
              <p>Total</p>
              <h2 className="text-2xl font-bold">
                {appointments.length}
              </h2>
            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search doctor or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : filteredAppointments.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaCalendarCheck className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-bold">
                No Appointments Found
              </h2>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredAppointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold flex items-center gap-2">

                        <FaUserMd className="text-blue-600" />

                        {appointment.doctor_name}

                      </h2>

                      <p className="text-gray-500 mt-2">
                        {appointment.specialization}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${getBadge(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-4 gap-5 mt-6">

                    <div>

                      <p className="text-gray-500">
                        Date
                      </p>

                      <p className="font-semibold">
                        {appointment.appointment_date}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 flex items-center gap-2">
                        <FaClock />
                        Time
                      </p>

                      <p className="font-semibold">
                        {appointment.appointment_time}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Reason
                      </p>

                      <p className="font-semibold">
                        {appointment.reason}
                      </p>

                    </div>

                    <div className="flex items-end gap-3">

                      {appointment.status === "Pending" && (
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                          <FaTimesCircle />
                          Cancel
                        </button>
                      )}

                      {appointment.status === "Confirmed" && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                          <FaCheckCircle />
                          View
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>
    </div>
  );
}