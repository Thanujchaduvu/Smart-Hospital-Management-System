import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaTint,
  FaVenusMars,
  FaMapMarkerAlt,
  FaUserShield,
  FaSave,
} from "react-icons/fa";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    address: "",
    emergency_contact: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.profile);
    } catch (error) {
      console.error(error);

      // Demo Data
      setProfile({
        name: "John Doe",
        email: "john@gmail.com",
        phone: "9876543210",
        gender: "Male",
        date_of_birth: "2002-08-20",
        blood_group: "O+",
        address: "Hyderabad, Telangana",
        emergency_contact: "9876500000",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/patient/profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="patient" />

      <div className="flex-1">

        <Navbar title="My Profile" />

        <div className="p-6">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <div className="flex flex-col items-center mb-8">

              <FaUserCircle className="text-8xl text-blue-600" />

              <h2 className="text-3xl font-bold mt-4">
                {profile.name}
              </h2>

              <p className="text-gray-500">
                Patient
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Name */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaUserCircle />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Email */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaEnvelope />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaPhone />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Gender */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaVenusMars />
                  Gender
                </label>

                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

              </div>

              {/* DOB */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaBirthdayCake />
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={profile.date_of_birth}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Blood */}

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaTint />
                  Blood Group
                </label>

                <input
                  type="text"
                  name="blood_group"
                  value={profile.blood_group}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Address */}

              <div className="md:col-span-2">

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt />
                  Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Emergency Contact */}

              <div className="md:col-span-2">

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaUserShield />
                  Emergency Contact
                </label>

                <input
                  type="text"
                  name="emergency_contact"
                  value={profile.emergency_contact}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

            </div>

            <div className="mt-8 flex justify-end">

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <FaSave />

                {saving ? "Saving..." : "Save Changes"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}