import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Staff() {
  const [staff, setStaff] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get("/admin/staff");
      setStaff(res.data.staff);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addStaff = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/staff", form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "doctor",
      });

      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      await api.delete(`/admin/staff/${id}`);
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            Staff Management
          </h1>

          {/* Add Staff Form */}

          <form
            onSubmit={addStaff}
            className="bg-white rounded-xl shadow p-6 mb-8"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border rounded-lg p-3"
              >
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="receptionist">Receptionist</option>
                <option value="laboratory">Laboratory</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="accountant">Accountant</option>
              </select>
            </div>

            <button
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Add Staff
            </button>
          </form>

          {/* Staff Table */}

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {staff.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4 capitalize">
                      {item.role}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteStaff(item.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {staff.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500"
                    >
                      No staff members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}