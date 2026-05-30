import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import API from "../../api/axios"

function MyAppointments() {

  const [appointments, setAppointments] =
    useState([])

  const fetchAppointments = async () => {

    try {

      const res =
        await API.get("/appointments")

      setAppointments(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchAppointments()

  }, [])

  const handlePayment = async (appointmentId) => {

    try {

      const { data } =
        await API.post(
          "/payment/create-order"
        )

      const options = {

        key: "YOUR_RAZORPAY_KEY_ID",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "AI Hospital",

        description:
          "Appointment Payment",

        handler: async function () {

          try {

            await API.put(
              `/appointments/pay/${appointmentId}`
            )

            alert(
              "Payment Successful"
            )

            fetchAppointments()

          }

          catch (err) {

            console.log(err)

          }

        }

      }

      const razorpay =
        new window.Razorpay(
          options
        )

      razorpay.open()

    }

    catch (err) {

      console.log(err)

      alert(
        "Payment Failed"
      )

    }

  }

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar role="patient" />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Appointments
        </h1>

        <div className="grid gap-6">

          {
            appointments.length > 0
              ? appointments.map(
                  (item) => (

                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
                  >

                    <h2 className="text-2xl font-bold">
                      Dr. {item.doctor_name}
                    </h2>

                    <p className="mt-2 text-slate-400">
                      Date:
                      {" "}
                      {item.appointment_date}
                    </p>

                    <div className="mt-4">

                      {
                        item.status ===
                        "Pending" && (

                          <span className="px-4 py-2 rounded-full bg-yellow-600">
                            Pending Approval
                          </span>

                        )
                      }

                      {
                        item.status ===
                        "Approved" && (

                          <span className="px-4 py-2 rounded-full bg-green-600">
                            Approved
                          </span>

                        )
                      }

                      {
                        item.status ===
                        "Rejected" && (

                          <span className="px-4 py-2 rounded-full bg-red-600">
                            Rejected
                          </span>

                        )
                      }

                    </div>

                    <div className="mt-5">

                      <p>
                        Payment Status:
                        {" "}
                        <span className="font-bold">

                          {
                            item.payment_status
                          }

                        </span>
                      </p>

                    </div>

                    {
                      item.status ===
                        "Approved" &&
                      item.payment_status ===
                        "Pending" && (

                        <button
                          onClick={() =>
                            handlePayment(
                              item.id
                            )
                          }
                          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl font-bold"
                        >
                          Pay ₹
                          {
                            item.consultation_fee
                          }
                        </button>

                      )
                    }

                    {
                      item.payment_status ===
                        "Paid" && (

                        <div className="mt-6 text-green-400 font-bold text-lg">
                          ✅ Payment Completed
                        </div>

                      )
                    }

                  </div>

                ))
              : (

                <div className="bg-slate-900 p-10 rounded-3xl">

                  <h2 className="text-2xl">
                    No Appointments Found
                  </h2>

                </div>

              )
          }

        </div>

      </div>

    </div>

  )

}

export default MyAppointments