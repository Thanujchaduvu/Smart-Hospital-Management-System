import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  Calendar,
  Clock,
  CheckCircle,
  User,
} from "lucide-react";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const pending = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const confirmed = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="doctor" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Doctor Dashboard" />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Welcome Doctor 👨‍⚕️
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6">
              <Calendar className="text-blue-600 mb-3" size={30} />
              <h2 className="text-3xl font-bold">
                {appointments.length}
              </h2>
              <p className="text-gray-600">Total Appointments</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <Clock className="text-yellow-600 mb-3" size={30} />
              <h2 className="text-3xl font-bold">
                {pending}
              </h2>
              <p className="text-gray-600">Pending</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <User className="text-blue-500 mb-3" size={30} />
              <h2 className="text-3xl font-bold">
                {confirmed}
              </h2>
              <p className="text-gray-600">Confirmed</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <CheckCircle
                className="text-green-600 mb-3"
                size={30}
              />
              <h2 className="text-3xl font-bold">
                {completed}
              </h2>
              <p className="text-gray-600">Completed</p>
            </div>

          </div>

          {/* Appointment Table */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                My Appointments
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                Loading...
              </div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No appointments found.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Patient</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Reason</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {appointment.patient_name}
                      </td>

                      <td className="p-4">
                        {appointment.appointment_date}
                      </td>

                      <td className="p-4">
                        {appointment.appointment_time}
                      </td>

                      <td className="p-4">
                        {appointment.reason}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : appointment.status === "Confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : appointment.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}