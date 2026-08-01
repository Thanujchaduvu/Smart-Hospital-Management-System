import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaMoneyBillWave,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    const filtered = bills.filter((bill) =>
      bill.invoice_number
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredBills(filtered);
  }, [search, bills]);

  const fetchBills = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patient/bills`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBills(res.data.bills || []);
      setFilteredBills(res.data.bills || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demoBills = [
        {
          id: 1,
          invoice_number: "INV-1001",
          doctor_name: "Dr. Sharma",
          consultation_fee: 500,
          lab_fee: 800,
          medicine_fee: 350,
          amount: 1650,
          payment_status: "Paid",
          payment_method: "UPI",
          created_at: "2026-08-01",
        },
        {
          id: 2,
          invoice_number: "INV-1002",
          doctor_name: "Dr. Rajesh",
          consultation_fee: 700,
          lab_fee: 600,
          medicine_fee: 450,
          amount: 1750,
          payment_status: "Pending",
          payment_method: "Cash",
          created_at: "2026-08-03",
        },
      ];

      setBills(demoBills);
      setFilteredBills(demoBills);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Billing" />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold">
                Billing & Payments
              </h1>

              <p className="text-gray-500">
                View all your invoices and payments
              </p>
            </div>

            <div className="bg-green-600 text-white px-6 py-4 rounded-xl">

              <p>Total Amount</p>

              <h2 className="text-2xl font-bold">
                ₹ {totalAmount}
              </h2>

            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Invoice..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            {loading ? (

              <div className="p-10 text-center">
                Loading...
              </div>

            ) : filteredBills.length === 0 ? (

              <div className="p-10 text-center">

                <FaMoneyBillWave className="mx-auto text-6xl text-gray-300 mb-4" />

                <h2 className="text-2xl font-bold">
                  No Bills Found
                </h2>

              </div>

            ) : (

              <table className="w-full">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    <th className="p-4 text-left">
                      Invoice
                    </th>

                    <th className="p-4">
                      Doctor
                    </th>

                    <th className="p-4">
                      Consultation
                    </th>

                    <th className="p-4">
                      Lab
                    </th>

                    <th className="p-4">
                      Medicine
                    </th>

                    <th className="p-4">
                      Total
                    </th>

                    <th className="p-4">
                      Status
                    </th>

                    <th className="p-4">
                      Payment
                    </th>

                    <th className="p-4">
                      Invoice
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredBills.map((bill) => (

                    <tr
                      key={bill.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">
                        {bill.invoice_number}
                      </td>

                      <td className="text-center">
                        {bill.doctor_name}
                      </td>

                      <td className="text-center">
                        ₹ {bill.consultation_fee}
                      </td>

                      <td className="text-center">
                        ₹ {bill.lab_fee}
                      </td>

                      <td className="text-center">
                        ₹ {bill.medicine_fee}
                      </td>

                      <td className="text-center font-bold">
                        ₹ {bill.amount}
                      </td>

                      <td className="text-center">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            bill.payment_status === "Paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {bill.payment_status}
                        </span>

                      </td>

                      <td className="text-center">
                        {bill.payment_method}
                      </td>

                      <td className="text-center">

                        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">

                          <FaDownload />

                          PDF

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>
      </div>
    </div>
  );
}