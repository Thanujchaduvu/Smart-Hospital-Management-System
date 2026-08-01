import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete appointment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar title="Appointment Management" />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              Appointment Management
            </h2>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              + New Appointment
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>
                  <th className="p-4 text-left">Patient</th>
                  <th className="p-4 text-left">Doctor</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {appointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-8 text-gray-500"
                    >
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {appointment.patient_name}
                      </td>

                      <td className="p-4">
                        {appointment.doctor_name}
                      </td>

                      <td className="p-4">
                        {appointment.department}
                      </td>

                      <td className="p-4">
                        {appointment.appointment_date}
                      </td>

                      <td className="p-4">
                        {appointment.appointment_time}
                      </td>

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                          {appointment.status}
                        </span>
                      </td>

                      <td className="p-4 text-center">

                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(appointment.id)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

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