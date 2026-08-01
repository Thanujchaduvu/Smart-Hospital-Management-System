import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaFlask,
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function LabReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const filtered = reports.filter(
      (report) =>
        report.test_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        report.doctor_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredReports(filtered);
  }, [search, reports]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/patient/lab-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data.reports || []);
      setFilteredReports(res.data.reports || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demo = [
        {
          test_id: 1,
          test_name: "Complete Blood Count",
          test_type: "Blood Test",
          doctor_name: "Dr. Sharma",
          result: "Normal",
          status: "Completed",
          uploaded_at: "2026-08-01",
          report_file: "",
        },
        {
          test_id: 2,
          test_name: "Blood Sugar",
          test_type: "Glucose",
          doctor_name: "Dr. Rajesh",
          result: "-",
          status: "Pending",
          uploaded_at: "2026-08-04",
          report_file: "",
        },
      ];

      setReports(demo);
      setFilteredReports(demo);
    } finally {
      setLoading(false);
    }
  };

  const completed = reports.filter(
    (r) => r.status === "Completed"
  ).length;

  const pending = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Lab Reports" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold">
                Laboratory Reports
              </h1>

              <p className="text-gray-500">
                View and download your test reports
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-green-600 text-white rounded-xl px-6 py-4 text-center">
                <p>Completed</p>
                <h2 className="text-2xl font-bold">
                  {completed}
                </h2>
              </div>

              <div className="bg-orange-500 text-white rounded-xl px-6 py-4 text-center">
                <p>Pending</p>
                <h2 className="text-2xl font-bold">
                  {pending}
                </h2>
              </div>

            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Reports */}

          {loading ? (
            <div className="text-center py-20">
              Loading...
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaFlask className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-bold">
                No Reports Available
              </h2>

              <p className="text-gray-500 mt-3">
                Your laboratory reports will appear here.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {filteredReports.map((report) => (

                <div
                  key={report.test_id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">
                        {report.test_name}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {report.test_type}
                      </p>

                    </div>

                    <div>

                      {report.status === "Completed" ? (
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2">

                          <FaCheckCircle />

                          Completed

                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full flex items-center gap-2">

                          <FaClock />

                          Pending

                        </span>
                      )}

                    </div>

                  </div>

                  <div className="grid md:grid-cols-4 gap-6 mt-6">

                    <div>
                      <p className="text-gray-500">
                        Doctor
                      </p>

                      <p className="font-semibold">
                        {report.doctor_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Result
                      </p>

                      <p className="font-semibold">
                        {report.result}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Uploaded
                      </p>

                      <p className="font-semibold">
                        {report.uploaded_at}
                      </p>
                    </div>

                    <div className="flex items-end">

                      {report.report_file ? (
                        <a
                          href={`http://localhost:5000/uploads/${report.report_file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                        >
                          <FaDownload />
                          Download
                        </a>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                        >
                          Not Available
                        </button>
                      )}

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