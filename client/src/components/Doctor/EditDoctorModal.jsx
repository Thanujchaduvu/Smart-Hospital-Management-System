import { useEffect, useState } from "react";
import axios from "axios";

export default function EditDoctorModal({
  doctor,
  isOpen,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    department_id: "",
    specialization: "",
    qualification: "",
    experience: "",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (doctor) {
      setForm({
        department_id: doctor.department_id || "",
        specialization: doctor.specialization || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience || "",
      });
    }
  }, [doctor]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/admin/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/doctors/${doctor.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Doctor updated successfully");

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update doctor");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[500px] p-6">
        <h2 className="text-2xl font-bold mb-6">
          Edit Doctor
        </h2>

        <div className="space-y-4">
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Department</option>

            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="w-full border p-3 rounded"
          />

          <input
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            placeholder="Qualification"
            className="w-full border p-3 rounded"
          />

          <input
            name="experience"
            type="number"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="w-full border p-3 rounded"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded bg-blue-600 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}