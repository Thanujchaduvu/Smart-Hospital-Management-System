import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaPills,
  FaSearch,
  FaUserMd,
  FaFileDownload,
  FaClipboardList,
} from "react-icons/fa";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    const filtered = prescriptions.filter(
      (item) =>
        item.medicine_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.doctor_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredPrescriptions(filtered);
  }, [search, prescriptions]);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/prescriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrescriptions(res.data.prescriptions || []);
      setFilteredPrescriptions(res.data.prescriptions || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demo = [
        {
          id: 1,
          medicine_name: "Paracetamol 500mg",
          dosage: "1 Tablet",
          frequency: "Twice Daily",
          duration: "5 Days",
          doctor_name: "Dr. Sharma",
          instructions: "Take after meals",
          prescribed_date: "2026-08-01",
        },
        {
          id: 2,
          medicine_name: "Amoxicillin",
          dosage: "1 Capsule",
          frequency: "Three Times Daily",
          duration: "7 Days",
          doctor_name: "Dr. Rajesh",
          instructions: "Complete the full course",
          prescribed_date: "2026-08-03",
        },
      ];

      setPrescriptions(demo);
      setFilteredPrescriptions(demo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Prescriptions" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold flex items-center gap-3">

                <FaPills className="text-green-600" />

                Prescriptions

              </h1>

              <p className="text-gray-500 mt-2">
                View all your prescribed medicines
              </p>

            </div>

            <div className="bg-green-600 text-white px-6 py-4 rounded-xl">

              <p>Total Prescriptions</p>

              <h2 className="text-2xl font-bold">
                {prescriptions.length}
              </h2>

            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search medicine or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : filteredPrescriptions.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaClipboardList className="mx-auto text-6xl text-gray-300 mb-4" />

              <h2 className="text-2xl font-bold">
                No Prescriptions Found
              </h2>

              <p className="text-gray-500 mt-3">
                Your prescriptions will appear here.
              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-6">

              {filteredPrescriptions.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-xl font-bold">
                        {item.medicine_name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {item.prescribed_date}
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                      Active
                    </span>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <div>

                      <p className="text-gray-500 text-sm">
                        Dosage
                      </p>

                      <p className="font-semibold">
                        {item.dosage}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Frequency
                      </p>

                      <p className="font-semibold">
                        {item.frequency}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Duration
                      </p>

                      <p className="font-semibold">
                        {item.duration}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Doctor
                      </p>

                      <p className="font-semibold flex items-center gap-2">

                        <FaUserMd className="text-blue-600" />

                        {item.doctor_name}

                      </p>

                    </div>

                  </div>

                  <div className="mt-5 bg-blue-50 rounded-lg p-4">

                    <p className="font-semibold mb-1">
                      Instructions
                    </p>

                    <p className="text-gray-600">
                      {item.instructions}
                    </p>

                  </div>

                  <div className="mt-6 flex justify-end">

                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">

                      <FaFileDownload />

                      Download

                    </button>

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