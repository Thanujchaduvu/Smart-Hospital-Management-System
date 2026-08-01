export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      icon: "📅",
      text: "Appointment booked with Dr. Rahul Sharma",
      color: "text-blue-600",
    },
    {
      id: 2,
      icon: "🧪",
      text: "Blood Test Report Uploaded",
      color: "text-green-600",
    },
    {
      id: 3,
      icon: "💊",
      text: "Prescription Updated",
      color: "text-purple-600",
    },
    {
      id: 4,
      icon: "💳",
      text: "Hospital Bill Generated",
      color: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg mt-8">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          📜 Recent Activity
        </h2>

      </div>

      <div className="p-5">

        <ul className="space-y-4">

          {activities.map((item) => (

            <li
              key={item.id}
              className="flex items-center gap-4"
            >

              <span
                className={`text-2xl ${item.color}`}
              >
                {item.icon}
              </span>

              <span>
                {item.text}
              </span>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}