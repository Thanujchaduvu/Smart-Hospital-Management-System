export default function NotificationWidget({ notifications }) {
  const defaultNotifications = [
    {
      id: 1,
      title: "Appointment Confirmed",
      message: "Your appointment has been confirmed.",
      icon: "📅",
    },
    {
      id: 2,
      title: "Lab Report Ready",
      message: "Your blood test report is available.",
      icon: "🧪",
    },
    {
      id: 3,
      title: "Prescription Updated",
      message: "Doctor added a new medicine.",
      icon: "💊",
    },
    {
      id: 4,
      title: "Bill Generated",
      message: "A new hospital bill has been generated.",
      icon: "💳",
    },
  ];

  const data =
    notifications.length > 0
      ? notifications
      : defaultNotifications;

  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          🔔 Notifications
        </h2>

      </div>

      <div className="p-5 space-y-4">

        {data.map((item) => (

          <div
            key={item.id}
            className="flex items-start gap-4 border-b pb-3"
          >

            <div className="text-2xl">
              {item.icon}
            </div>

            <div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.message}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}