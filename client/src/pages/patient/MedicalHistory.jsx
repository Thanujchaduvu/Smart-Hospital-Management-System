import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaHistory,
  FaSearch,
  FaUserMd,
  FaCalendarAlt,
  FaClipboardCheck,
} from "react-icons/fa";

export default function MedicalHistory() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = history.filter(
      (item) =>
        item.doctor_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.reason
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredHistory(filtered);
  }, [search, history]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/medical-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data.history || []);
      setFilteredHistory(res.data.history || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demoHistory = [
        {
          id: 1,
          appointment_date: "2026-07-10",
          appointment_time: "10:00 AM",
          doctor_name: "Dr. Sharma",
          specialization: "Cardiology",
          reason: "Chest Pain",
          diagnosis: "Mild Hypertension",
          status: "Completed",
        },
        {
          id: 2,
          appointment_date: "2026-06-15",
          appointment_time: "11:30 AM",
          doctor_name: "Dr. Rajesh",
          specialization: "General Medicine",
          reason: "Fever",
          diagnosis: "Viral Infection",
          status: "Completed",
        },
      ];

      setHistory(demoHistory);
      setFilteredHistory(demoHistory);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Medical History" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaHistory />
                Medical History
              </h1>

              <p className="text-gray-500 mt-2">
                Complete record of your previous consultations
              </p>
            </div>

            <div className="bg-blue-600 text-white px-6 py-4 rounded-xl text-center">
              <p>Total Visits</p>
              <h2 className="text-2xl font-bold">
                {history.length}
              </h2>
            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search by doctor or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Timeline */}

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : filteredHistory.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />

              <h2 className="text-2xl font-bold">
                No Medical History
              </h2>

              <p className="text-gray-500 mt-3">
                Your completed appointments will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {filteredHistory.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaUserMd className="text-blue-600" />
                        {item.doctor_name}
                      </h2>

                      <p className="text-gray-500">
                        {item.specialization}
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      {item.status}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

                    <div>

                      <p className="text-gray-500 flex items-center gap-2">
                        <FaCalendarAlt />
                        Date
                      </p>

                      <p className="font-semibold">
                        {item.appointment_date}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Time
                      </p>

                      <p className="font-semibold">
                        {item.appointment_time}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Reason
                      </p>

                      <p className="font-semibold">
                        {item.reason}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Diagnosis
                      </p>

                      <p className="font-semibold">
                        {item.diagnosis || "N/A"}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 bg-blue-50 rounded-lg p-4">

                    <p className="flex items-center gap-2 font-semibold">

                      <FaClipboardCheck />

                      Consultation Completed

                    </p>

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