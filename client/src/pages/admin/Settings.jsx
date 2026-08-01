import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import api from "../../services/api";

export default function Settings() {
  const [hospitalName, setHospitalName] = useState("AI Hospital");
  const [email, setEmail] = useState("admin@aihospital.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [address, setAddress] = useState("Hyderabad, Telangana");
  const [loading, setLoading] = useState(false);

  const saveSettings = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.put("/admin/settings", {
        hospitalName,
        email,
        phone,
        address,
      });

      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Hospital Settings
          </h1>

          <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl">
            <form
              onSubmit={saveSettings}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2 font-semibold">
                  Hospital Name
                </label>

                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) =>
                    setHospitalName(e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Phone
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Address
                </label>

                <textarea
                  rows="4"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
              >
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}