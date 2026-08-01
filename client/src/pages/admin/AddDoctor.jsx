import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function AddDoctor() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department_id: "",
    specialization: "",
    qualification: "",
    experience: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data);
    } catch (err) {
      console.error("Error loading departments:", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.department_id) {
      alert("Please select a department");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/doctors`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Doctor added successfully");
      navigate("/admin/doctors");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to add doctor"
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar title="Add Doctor" />

        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              Add Doctor
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <select
                name="department_id"
                value={form.department_id}
                className="border p-3 rounded"
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>

                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                className="border p-3 rounded"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}