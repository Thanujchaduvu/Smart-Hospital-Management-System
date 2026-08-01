import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import {
  FaCapsules,
  FaSearch,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function Pharmacy() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.medicine_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.pharmacy_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredOrders(filtered);
  }, [search, orders]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/patient/pharmacy",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
      setFilteredOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);

      // Demo Data
      const demo = [
        {
          id: 1,
          medicine_name: "Paracetamol 500mg",
          quantity: 10,
          price: 120,
          pharmacy_name: "AI Hospital Pharmacy",
          order_date: "2026-08-01",
          status: "Delivered",
        },
        {
          id: 2,
          medicine_name: "Vitamin D",
          quantity: 30,
          price: 450,
          pharmacy_name: "AI Hospital Pharmacy",
          order_date: "2026-08-05",
          status: "Processing",
        },
      ];

      setOrders(demo);
      setFilteredOrders(demo);
    } finally {
      setLoading(false);
    }
  };

  const delivered = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const processing = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  const totalAmount = orders.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="patient" />

      <div className="flex-1">
        <Navbar title="Pharmacy" />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold flex items-center gap-3">

                <FaCapsules className="text-green-600" />

                Pharmacy Orders

              </h1>

              <p className="text-gray-500 mt-2">
                View your medicine purchase history
              </p>

            </div>

            <div className="grid grid-cols-3 gap-4">

              <div className="bg-green-600 text-white rounded-xl px-5 py-4 text-center">
                <p>Delivered</p>
                <h2 className="text-2xl font-bold">
                  {delivered}
                </h2>
              </div>

              <div className="bg-yellow-500 text-white rounded-xl px-5 py-4 text-center">
                <p>Processing</p>
                <h2 className="text-2xl font-bold">
                  {processing}
                </h2>
              </div>

              <div className="bg-blue-600 text-white rounded-xl px-5 py-4 text-center">
                <p>Total</p>
                <h2 className="text-2xl font-bold">
                  ₹{totalAmount}
                </h2>
              </div>

            </div>

          </div>

          {/* Search */}

          <div className="relative mb-6">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

          {/* Orders */}

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : filteredOrders.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-16 text-center">

              <FaCapsules className="mx-auto text-6xl text-gray-300 mb-4" />

              <h2 className="text-2xl font-bold">
                No Pharmacy Orders
              </h2>

              <p className="text-gray-500 mt-3">
                Your medicine orders will appear here.
              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-2 gap-6">

              {filteredOrders.map((order) => (

                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-xl font-bold">
                        {order.medicine_name}
                      </h2>

                      <p className="text-gray-500">
                        {order.pharmacy_name}
                      </p>

                    </div>

                    {order.status === "Delivered" ? (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2">
                        <FaCheckCircle />
                        Delivered
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full flex items-center gap-2">
                        <FaClock />
                        Processing
                      </span>
                    )}

                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Quantity
                      </p>

                      <h3 className="font-bold text-lg">
                        {order.quantity}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Price
                      </p>

                      <h3 className="font-bold text-lg">
                        ₹{order.price}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Order Date
                      </p>

                      <h3 className="font-bold text-lg">
                        {order.order_date}
                      </h3>
                    </div>

                  </div>

                  <div className="mt-6">

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">

                      <FaShoppingCart />

                      Reorder

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