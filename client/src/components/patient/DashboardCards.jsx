import {
  FaCalendarCheck,
  FaNotesMedical,
  FaFileMedical,
  FaMoneyBillWave,
  FaCapsules,
  FaHeartbeat,
} from "react-icons/fa";

export default function DashboardCards({
  dashboard,
  loading,
}) {
  const cards = [
    {
      title: "Appointments",
      value: dashboard.appointments.length,
      icon: <FaCalendarCheck />,
      color: "bg-blue-600",
    },
    {
      title: "Prescriptions",
      value: dashboard.prescriptions.length,
      icon: <FaNotesMedical />,
      color: "bg-green-600",
    },
    {
      title: "Lab Reports",
      value: dashboard.reports.length,
      icon: <FaFileMedical />,
      color: "bg-purple-600",
    },
    {
      title: "Pending Bills",
      value: dashboard.bills.filter(
        (bill) => bill.status === "Pending"
      ).length,
      icon: <FaMoneyBillWave />,
      color: "bg-red-600",
    },
    {
      title: "Medicine Orders",
      value: dashboard.pharmacyOrders.length,
      icon: <FaCapsules />,
      color: "bg-orange-500",
    },
    {
      title: "Health Score",
      value: "98%",
      icon: <FaHeartbeat />,
      color: "bg-cyan-600",
    },
  ];

  return (
    <>
      {/* Welcome Banner */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 shadow-lg mb-8">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Manage your appointments,
          prescriptions, reports,
          pharmacy orders and billing
          from one dashboard.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition"
          >

            <div>

              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "--" : card.value}
              </h2>

            </div>

            <div
              className={`${card.color} text-white p-5 rounded-full text-3xl`}
            >
              {card.icon}
            </div>

          </div>

        ))}

      </div>
    </>
  );
}