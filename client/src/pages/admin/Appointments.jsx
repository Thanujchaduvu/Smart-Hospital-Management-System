import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import API from "../../api/axios"

function Appointments() {

  const [appointments, setAppointments] = useState([])

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

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar role="admin" />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          All Appointments
        </h1>

        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-800">

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

                      <span className="px-4 py-2 rounded-full bg-cyan-600">

                        {item.status}

                      </span>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Appointments