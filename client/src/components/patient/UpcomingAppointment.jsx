export default function UpcomingAppointment({
  appointments,
}) {
  return (
    <div className="bg-white rounded-xl shadow mt-10">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          Upcoming Appointment
        </h2>

      </div>

      <div className="p-5">

        {appointments.length === 0 ? (

          <div className="text-center py-8 text-gray-500">

            <div className="text-6xl">
              📅
            </div>

            <p>No Upcoming Appointment</p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <h3 className="font-bold">
                Doctor
              </h3>

              <p>
                {appointments[0].doctor_name}
              </p>

              <p className="text-gray-500">
                {appointments[0].specialization}
              </p>

              <p className="mt-2">
                {appointments[0].reason}
              </p>

            </div>

            <div>

              <p>
                <strong>Date:</strong>{" "}
                {appointments[0].appointment_date}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {appointments[0].appointment_time}
              </p>

              <p className="mt-3">

                <span className="bg-green-600 text-white px-3 py-1 rounded-full">

                  {appointments[0].status}

                </span>

              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}