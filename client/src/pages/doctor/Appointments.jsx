import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/doctor/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/doctor/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="doctor" />

      <div className="flex-1">
        <Navbar title="Appointments" />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            My Appointments
          </h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Patient</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Reason</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-6">
                      Loading...
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-6">
                      No Appointments Found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b hover:bg-gray-50"
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
                          className={`px-3 py-1 rounded-full text-sm
                          ${
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

                      <td className="p-4 text-center">

                        {appointment.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "Confirmed"
                                )
                              }
                              className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "Rejected"
                                )
                              }
                              className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {appointment.status === "Confirmed" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "Completed"
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Complete
                          </button>
                        )}

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
  );
}