import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function PharmacyStaff() {

  const token = localStorage.getItem("token");

  const [staff, setStaff] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employee_id: "",
    qualification: "",
    experience: "",
    phone: "",
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {

    try {

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/pharmacy-staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaff(res.data.data);

    } catch (err) {

      console.error(err);

    }

  };

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      employee_id: "",
      qualification: "",
      experience: "",
      phone: "",
    });

  };

    // =====================================
  // ADD OR UPDATE PHARMACY STAFF
  // =====================================

  const saveStaff = async () => {

    try {

      if (editingId) {

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/pharmacy-staff/${editingId}`,

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );

      } else {

        await axios.post(

          "${import.meta.env.VITE_API_URL}/api/pharmacy-staff",

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );

      }

      setShowModal(false);

      resetForm();

      fetchStaff();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Something went wrong."
      );

    }

  };

  // =====================================
  // EDIT STAFF
  // =====================================

  const editStaff = (staffMember) => {

    setEditingId(staffMember.id);

    setFormData({

      name: staffMember.name,

      email: staffMember.email,

      password: "",

      employee_id: staffMember.employee_id,

      qualification: staffMember.qualification,

      experience: staffMember.experience,

      phone: staffMember.phone,

    });

    setShowModal(true);

  };

  // =====================================
  // DELETE STAFF
  // =====================================

  const deleteStaff = async (id) => {

    if (!window.confirm("Delete this pharmacy staff member?")) {
      return;
    }

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/pharmacy-staff/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      fetchStaff();

    } catch (err) {

      console.error(err);

      alert("Unable to delete pharmacy staff.");

    }

  };

    return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="admin" />

      <div className="flex-1">

        <Navbar title="Pharmacy Staff" />

        <div className="p-8">

          {/* ===========================
              HEADER
          =========================== */}

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-3xl font-bold">
                Pharmacy Staff Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage pharmacy staff accounts and login credentials.
              </p>

            </div>

            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
            >
              + Add Pharmacy Staff
            </button>

          </div>

          {/* ===========================
              TABLE
          =========================== */}

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="min-w-full">

              <thead className="bg-green-600 text-white">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Employee ID
                  </th>

                  <th className="px-4 py-3 text-left">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left">
                    Qualification
                  </th>

                  <th className="px-4 py-3 text-left">
                    Experience
                  </th>

                  <th className="px-4 py-3 text-left">
                    Phone
                  </th>

                  <th className="px-4 py-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {staff.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-8 text-gray-500"
                    >
                      No Pharmacy Staff Found
                    </td>

                  </tr>

                ) : (

                  staff.map((member) => (

                    <tr
                      key={member.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">
                        {member.employee_id}
                      </td>

                      <td className="px-4 py-4">
                        {member.name}
                      </td>

                      <td className="px-4 py-4">
                        {member.email}
                      </td>

                      <td className="px-4 py-4">
                        {member.qualification}
                      </td>

                      <td className="px-4 py-4">
                        {member.experience} Years
                      </td>

                      <td className="px-4 py-4">
                        {member.phone}
                      </td>

                      <td className="px-4 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => editStaff(member)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteStaff(member.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* ==========================================
    ADD / EDIT PHARMACY STAFF MODAL
========================================== */}

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          {editingId
            ? "Edit Pharmacy Staff"
            : "Add Pharmacy Staff"}
        </h2>

        <button
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="text-3xl text-gray-500 hover:text-red-600"
        >
          ×
        </button>

      </div>

      {/* Form */}

      <div className="grid grid-cols-2 gap-5">

        {/* Name */}

        <div>

          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Email */}

        <div>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Password */}

        {!editingId && (

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

        )}

        {/* Employee ID */}

        <div>

          <label className="block mb-2 font-medium">
            Employee ID
          </label>

          <input
            type="text"
            value={formData.employee_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                employee_id: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Qualification */}

        <div>

          <label className="block mb-2 font-medium">
            Qualification
          </label>

          <input
            type="text"
            value={formData.qualification}
            onChange={(e) =>
              setFormData({
                ...formData,
                qualification: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Experience */}

        <div>

          <label className="block mb-2 font-medium">
            Experience (Years)
          </label>

          <input
            type="number"
            value={formData.experience}
            onChange={(e) =>
              setFormData({
                ...formData,
                experience: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Phone */}

        <div className="col-span-2">

          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={saveStaff}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
          {editingId
            ? "Update Pharmacy Staff"
            : "Add Pharmacy Staff"}
        </button>

      </div>

    </div>

  </div>
)}

        </div>

      </div>

    </div>
  );
}