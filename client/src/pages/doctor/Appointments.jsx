import { useEffect, useState }
from "react"

import API
from "../../api/axios"

function Appointments() {

  const [appointments,
    setAppointments] =
    useState([])

  const fetchAppointments =
    async () => {

      try {

        const res =
          await API.get(
            "/appointments"
          )

        setAppointments(
          res.data
        )

      }

      catch (err) {

        console.log(err)

      }

    }

  useEffect(() => {

    fetchAppointments()

  }, [])

  const updateStatus =
    async (id, status) => {

      try {

        await API.put(
          `/appointments/${id}`,
          { status }
        )

        fetchAppointments()

      }

      catch (err) {

        console.log(err)

      }

    }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Appointments
      </h1>

      <div className="overflow-hidden rounded-3xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-5 text-left">
                Patient
              </th>

              <th className="p-5 text-left">
                Doctor
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              appointments.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-slate-800"
                >

                  <td className="p-5">
                    {item.patient_name}
                  </td>

                  <td className="p-5">
                    {item.doctor_name}
                  </td>

                  <td className="p-5">
                    {item.appointment_date}
                  </td>

                  <td className="p-5">

                    <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400">

                      {item.status}

                    </span>

                  </td>

                  <td className="p-5 flex gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "Approved"
                        )
                      }
                      className="px-4 py-2 bg-green-600 rounded-xl"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "Rejected"
                        )
                      }
                      className="px-4 py-2 bg-red-600 rounded-xl"
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Appointments