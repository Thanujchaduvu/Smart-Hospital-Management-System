import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaUserShield,
  FaBell,
  FaMoon,
  FaLock,
  FaSave,
} from "react-icons/fa";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    twoFactorAuth: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    alert("Settings Saved Successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="patient" />

      <div className="flex-1">

        <Navbar title="Settings" />

        <div className="p-6">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-8">
              Account Settings
            </h1>

            {/* Notifications */}

            <div className="border rounded-xl p-6 mb-6">

              <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">
                <FaBell className="text-blue-600" />
                Notifications
              </h2>

              <div className="flex justify-between items-center mb-4">

                <span>Email Notifications</span>

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

              </div>

              <div className="flex justify-between items-center">

                <span>SMS Notifications</span>

                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

              </div>

            </div>

            {/* Appearance */}

            <div className="border rounded-xl p-6 mb-6">

              <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">
                <FaMoon className="text-indigo-600" />
                Appearance
              </h2>

              <div className="flex justify-between items-center">

                <span>Dark Mode</span>

                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

              </div>

            </div>

            {/* Security */}

            <div className="border rounded-xl p-6 mb-6">

              <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">
                <FaUserShield className="text-green-600" />
                Security
              </h2>

              <div className="flex justify-between items-center mb-5">

                <span>Enable Two-Factor Authentication</span>

                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

              </div>

              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaLock />
                Change Password
              </h3>

              <div className="grid md:grid-cols-3 gap-4">

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={settings.currentPassword}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={settings.newPassword}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={settings.confirmPassword}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                />

              </div>

            </div>

            {/* Save Button */}

            <div className="flex justify-end">

              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <FaSave />
                Save Settings
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}