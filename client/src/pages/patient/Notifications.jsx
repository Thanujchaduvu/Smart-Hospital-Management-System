import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaBell,
  FaCalendarCheck,
  FaPills,
  FaFlask,
  FaMoneyBillWave,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const filtered = notifications.filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.message?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredNotifications(filtered);
  }, [search, notifications]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/patient/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data.notifications || []);
      setFilteredNotifications(res.data.notifications || []);
    } catch (error) {
      console.error(error);

      // Demo Notifications
      const demo = [
        {
          id: 1,
          type: "appointment",
          title: "Appointment Confirmed",
          message:
            "Your appointment with Dr. Sharma has been confirmed.",
          created_at: "2026-08-01 10:30 AM",
        },
        {
          id: 2,
          type: "report",
          title: "Lab Report Uploaded",
          message:
            "Your Blood Test report is ready for download.",
          created_at: "2026-08-02 11:00 AM",
        },
        {
          id: 3,
          type: "prescription",
          title: "Prescription Added",
          message:
            "Dr. Rajesh has prescribed Paracetamol.",
          created_at: "2026-08-03 09:15 AM",
        },
        {
          id: 4,
          type: "billing",
          title: "Invoice Generated",
          message:
            "Your payment invoice has been generated.",
          created_at: "2026-08-04 04:20 PM",
        },
      ];

      setNotifications(demo);
      setFilteredNotifications(demo);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return (
          <FaCalendarCheck className="text-blue-600 text-2xl" />
        );

      case "report":
        return (
          <FaFlask className="text-purple-600 text-2xl" />
        );

      case "prescription":
        return (
          <FaPills className="text-green-600 text-2xl" />
        );

      case "billing":
        return (
          <FaMoneyBillWave className="text-yellow-500 text-2xl" />
        );

      default:
        return (
          <FaInfoCircle className="text-gray-600 text-2xl" />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Notifications" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold flex items-center gap-3">

                <FaBell className="text-red-500" />

                Notifications

              </h1>

              <p className="text-gray-500 mt-2">
                Stay updated with your healthcare activities
              </p>

            </div>

            <div className="bg-blue-600 text-white px-6 py-4 rounded-xl">

              <p>Total</p>

              <h2 className="text-2xl font-bold">
                {notifications.length}
              </h2>

            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Notifications */}

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : filteredNotifications.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaBell className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-bold">
                No Notifications
              </h2>

              <p className="text-gray-500 mt-2">
                You're all caught up.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredNotifications.map((notification) => (

                <div
                  key={notification.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  <div className="flex gap-5">

                    <div>

                      {getIcon(notification.type)}

                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between items-center">

                        <h2 className="text-xl font-bold">
                          {notification.title}
                        </h2>

                        <span className="text-sm text-gray-500">
                          {notification.created_at}
                        </span>

                      </div>

                      <p className="text-gray-600 mt-3">
                        {notification.message}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>
    </div>
  );
}