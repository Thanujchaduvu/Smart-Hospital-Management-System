export default function HealthSummary() {
  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          ❤️ Health Summary
        </h2>

      </div>

      <div className="p-5">

        <div className="grid grid-cols-2 gap-5">

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-500">
              Blood Group
            </p>
            <h2 className="text-2xl font-bold">
              O+
            </h2>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-gray-500">
              Height
            </p>
            <h2 className="text-2xl font-bold">
              170 cm
            </h2>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-gray-500">
              Weight
            </p>
            <h2 className="text-2xl font-bold">
              65 kg
            </h2>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-gray-500">
              BMI
            </p>
            <h2 className="text-2xl font-bold">
              22.5
            </h2>
          </div>

        </div>

        <div className="mt-8">

          <p className="font-semibold mb-2">
            Overall Health Score
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className="bg-green-600 h-4 rounded-full"
              style={{ width: "92%" }}
            />

          </div>

          <p className="text-right mt-2 font-bold text-green-600">
            92%
          </p>

        </div>

      </div>

    </div>
  );
}