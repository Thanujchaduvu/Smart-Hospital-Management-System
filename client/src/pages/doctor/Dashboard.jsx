import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import API from "../../api/axios"

function Dashboard() {

  const [available, setAvailable] = useState(true)
  const [appointments, setAppointments] = useState([])

  const email =
    localStorage.getItem("doctorEmail")

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

  const toggleAvailability = async () => {

    try {

      await API.put(
        "/doctor/availability",
        {
          email,
          isAvailable: !available
        }
      )

      setAvailable(!available)

    }

    catch (err) {

      console.log(err)

    }

  }

  const approved =
    appointments.filter(
      item => item.status === "Approved"
    ).length

  const pending =
    appointments.filter(
      item => item.status === "Pending"
    ).length

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar role="doctor" />

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Doctor Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Manage appointments, reports and patients
            </p>

          </div>

          <button
            onClick={toggleAvailability}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition ${
              available
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >

            {available
              ? "🟢 ONLINE"
              : "🔴 OFFLINE"}

          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h3 className="text-slate-400 mb-3">
              Total Appointments
            </h3>

            <h1 className="text-5xl font-bold">
              {appointments.length}
            </h1>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h3 className="text-slate-400 mb-3">
              Approved
            </h3>

            <h1 className="text-5xl font-bold text-green-400">
              {approved}
            </h1>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h3 className="text-slate-400 mb-3">
              Pending
            </h3>

            <h1 className="text-5xl font-bold text-yellow-400">
              {pending}
            </h1>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h3 className="text-slate-400 mb-3">
              Earnings
            </h3>

            <h1 className="text-5xl font-bold text-cyan-400">
              ₹25K
            </h1>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid gap-4">

              <Link
                to="/doctor/appointments"
                className="p-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-center font-bold"
              >
                Manage Appointments
              </Link>

              <Link
                to="/doctor/history"
                className="p-5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-center font-bold"
              >
                Add Medical History
              </Link>

              <Link
                to="/doctor/reports"
                className="p-5 rounded-2xl bg-green-600 hover:bg-green-700 text-center font-bold"
              >
                View Patient Reports
              </Link>

              <Link
                to="/patient/symptoms"
                className="p-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-center font-bold"
              >
                AI Symptom Checker
              </Link>

            </div>

          </div>

          {/* Recent Appointments */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Recent Appointments
            </h2>

            <div className="space-y-4">

              {
                appointments.length > 0
                  ? appointments
                      .slice(0, 5)
                      .map((item) => (

                        <div
                          key={item.id}
                          className="bg-slate-800 rounded-2xl p-5"
                        >

                          <h3 className="font-bold text-lg">
                            {item.patient_name}
                          </h3>

                          <p className="text-slate-400 mt-1">
                            {item.appointment_date}
                          </p>

                          <p className="mt-2 text-cyan-400">
                            {item.status}
                          </p>

                        </div>

                      ))
                  : (
                    <p className="text-slate-400">
                      No appointments found
                    </p>
                  )
              }

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard