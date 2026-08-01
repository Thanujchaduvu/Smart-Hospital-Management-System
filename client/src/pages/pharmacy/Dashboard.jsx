import {
  FaCapsules,
  FaBoxes,
  FaPrescriptionBottleAlt,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from "react-icons/fa";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Medicines",
      value: 1248,
      icon: <FaCapsules />,
      color: "bg-blue-500",
    },
    {
      title: "Low Stock",
      value: 18,
      icon: <FaExclamationTriangle />,
      color: "bg-red-500",
    },
    {
      title: "Today's Sales",
      value: 86,
      icon: <FaMoneyBillWave />,
      color: "bg-green-500",
    },
    {
      title: "Pending Prescriptions",
      value: 12,
      icon: <FaPrescriptionBottleAlt />,
      color: "bg-orange-500",
    },
  ];

  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      stock: 350,
      status: "Available",
    },
    {
      id: 2,
      name: "Amoxicillin",
      stock: 15,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Vitamin C",
      stock: 200,
      status: "Available",
    },
    {
      id: 4,
      name: "Insulin",
      stock: 8,
      status: "Critical",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="pharmacy" />

      <div className="flex-1">

        <Navbar title="Pharmacy Dashboard" />

        <div className="p-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Pharmacy Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to the Pharmacy Management System
            </p>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
              >

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`${item.color} text-white p-4 rounded-full text-3xl`}
                >
                  {item.icon}
                </div>

              </div>

            ))}

          </div>

          {/* Main Content */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Inventory */}

            <div className="lg:col-span-2 bg-white rounded-xl shadow">

              <div className="p-5 border-b">

                <h2 className="text-xl font-semibold">
                  Medicine Inventory
                </h2>

              </div>

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-5 py-3">
                      Medicine
                    </th>

                    <th className="text-left px-5 py-3">
                      Stock
                    </th>

                    <th className="text-left px-5 py-3">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {medicines.map((medicine) => (

                    <tr
                      key={medicine.id}
                      className="border-b"
                    >

                      <td className="px-5 py-4">
                        {medicine.name}
                      </td>

                      <td className="px-5 py-4">
                        {medicine.stock}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            medicine.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : medicine.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {medicine.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl font-semibold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Add Medicine
                </button>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                  View Inventory
                </button>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg">
                  Pending Prescriptions
                </button>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
                  Sales Report
                </button>

              </div>

              <div className="mt-8">

                <h3 className="font-semibold mb-3">
                  Inventory Summary
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between">

                    <span>Total Medicines</span>

                    <strong>1248</strong>

                  </div>

                  <div className="flex justify-between">

                    <span>Low Stock</span>

                    <strong className="text-red-600">
                      18
                    </strong>

                  </div>

                  <div className="flex justify-between">

                    <span>Expired</span>

                    <strong>4</strong>

                  </div>

                  <div className="flex justify-between">

                    <span>Today's Revenue</span>

                    <strong className="text-green-600">
                      ₹42,800
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}