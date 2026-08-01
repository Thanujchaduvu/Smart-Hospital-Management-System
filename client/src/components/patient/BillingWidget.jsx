export default function BillingWidget({ bills }) {
  return (
    <div className="bg-white rounded-xl shadow-lg">

      <div className="border-b p-5">
        <h2 className="text-xl font-bold">
          💳 Pending Bills
        </h2>
      </div>

      <div className="p-5">

        {bills.length === 0 ? (

          <p className="text-gray-500">
            No bills available.
          </p>

        ) : (

          bills.slice(0, 5).map((bill) => (

            <div
              key={bill.id}
              className="border-b py-3 flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold">
                  #{bill.invoice_number}
                </h3>

                <p className="text-sm text-gray-500">
                  ₹{bill.amount}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  bill.status === "Paid"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {bill.status}
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}