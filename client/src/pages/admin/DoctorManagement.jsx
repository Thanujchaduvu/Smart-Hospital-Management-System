import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import EditDoctorModal from "../../components/Doctor/EditDoctorModal";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditOpen(true);
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/doctors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Doctor deleted successfully");

      fetchDoctors();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete doctor"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar title="Doctor Management" />

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Doctor Management
            </h2>

            <Link
              to="/admin/doctors/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              + Add Doctor
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Specialization</th>
                  <th className="p-4 text-left">Experience</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 text-gray-500"
                    >
                      No doctors found.
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">{doctor.name}</td>

                      <td className="p-4">{doctor.email}</td>

                      <td className="p-4">
                        {doctor.department || "-"}
                      </td>

                      <td className="p-4">
                        {doctor.specialization}
                      </td>

                      <td className="p-4">
                        {doctor.experience} Years
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              doctor.id,
                              doctor.name
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          <EditDoctorModal
            doctor={selectedDoctor}
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedDoctor(null);
            }}
            onUpdated={fetchDoctors}
          />
        </div>
      </div>
    </div>
  );
}