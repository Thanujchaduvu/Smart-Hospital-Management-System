import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import api from "../../services/api";

export default function StaffManagement() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      const res = await api.get("/admin/staff");
      setStaff(res.data.staff || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load staff.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteStaff(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/staff/${id}`);
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert("Unable to delete staff.");
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Staff Management
            </h1>

            <button
              onClick={() => navigate("/admin/staff/add")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Staff
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center p-6"
                      >
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staff.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b"
                      >
                        <td className="p-3">{member.name}</td>
                        <td className="p-3">{member.email}</td>
                        <td className="p-3 capitalize">
                          {member.role}
                        </td>

                        <td className="p-3 flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/staff/edit/${member.id}`
                              )
                            }
                            className="bg-green-600 text-white px-4 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteStaff(member.id)}
                            className="bg-red-600 text-white px-4 py-1 rounded"
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
          )}
        </div>
      </div>
    </div>
  );
}