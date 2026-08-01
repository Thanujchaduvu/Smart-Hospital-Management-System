import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function BookAppointment() {
  const token = localStorage.getItem("token");

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    doctor_id: "",
    department_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoctors(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment booked successfully!");

      setFormData({
        doctor_id: "",
        department_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Unable to book appointment."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="patient" />

      <div className="flex-1">

        <Navbar title="Book Appointment" />

        <div className="p-8">

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-8">
              Book Appointment
            </h1>

            <form
              onSubmit={bookAppointment}
              className="grid grid-cols-2 gap-6"
            >

              <div>
                <label className="block mb-2 font-medium">
                  Department
                </label>

                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="">Select Department</option>

                  {departments.map((dept) => (
                    <option
                      key={dept.id}
                      value={dept.id}
                    >
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Doctor
                </label>

                <select
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="">
                    Select Doctor
                  </option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id}
                    >
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Appointment Time
                </label>

                <input
                  type="time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div className="col-span-2">

                <label className="block mb-2 font-medium">
                  Reason for Visit
                </label>

                <textarea
                  rows="5"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Describe your symptoms or reason for appointment..."
                />

              </div>

              <div className="col-span-2">

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold"
                >
                  Book Appointment
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}