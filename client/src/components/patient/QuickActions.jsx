import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    {
      title: "Book Appointment",
      icon: "📅",
      link: "/patient/book-appointment",
      color: "bg-blue-600",
    },
    {
      title: "View Reports",
      icon: "🧪",
      link: "/patient/lab-reports",
      color: "bg-purple-600",
    },
    {
      title: "Order Medicines",
      icon: "💊",
      link: "/patient/pharmacy",
      color: "bg-green-600",
    },
    {
      title: "Pay Bills",
      icon: "💳",
      link: "/patient/billing",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {actions.map((action) => (

          <Link
            key={action.title}
            to={action.link}
            className={`${action.color} text-white rounded-xl p-6 text-center shadow hover:scale-105 transition`}
          >

            <div className="text-4xl">
              {action.icon}
            </div>

            <p className="mt-3 font-semibold">
              {action.title}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}