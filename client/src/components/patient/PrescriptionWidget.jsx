export default function PrescriptionWidget({ prescriptions }) {
  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="border-b p-5">
        <h2 className="text-xl font-bold">
          💊 Active Prescriptions
        </h2>
      </div>

      <div className="p-5">

        {prescriptions.length === 0 ? (

          <p className="text-gray-500">
            No active prescriptions.
          </p>

        ) : (

          prescriptions.slice(0, 5).map((item) => (

            <div
              key={item.id}
              className="border-b py-3"
            >

              <h3 className="font-semibold">
                {item.medicine_name}
              </h3>

              <p className="text-sm text-gray-500">
                Dosage: {item.dosage}
              </p>

              <p className="text-sm text-gray-500">
                Duration: {item.duration}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}