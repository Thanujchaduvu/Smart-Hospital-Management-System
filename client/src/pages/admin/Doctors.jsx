import { useEffect, useState } from "react"
import API from "../../api/axios"

function Doctors() {

  const [doctors, setDoctors] =
    useState([])

  const fetchDoctors = async () => {

    try {

      const res = await API.get(
        "/admin/doctors"
      )

      setDoctors(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchDoctors()

  }, [])

  const deleteDoctor = async (id) => {

    try {

      await API.delete(
        `/admin/doctors/${id}`
      )

      fetchDoctors()

    }

    catch (err) {

      console.log(err)

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Doctors
          </h1>

          <p className="text-slate-400 mt-2">
            Manage hospital doctors
          </p>

        </div>

        <input
          type="text"
          placeholder="Search doctors..."
          className="bg-slate-900 border border-slate-700 px-5 py-3 rounded-2xl outline-none"
        />

      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-6 text-left">
                ID
              </th>

              <th className="p-6 text-left">
                Name
              </th>

              <th className="p-6 text-left">
                Email
              </th>

              <th className="p-6 text-left">
                Role
              </th>

              <th className="p-6 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              doctors.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >

                  <td className="p-6">
                    {item.id}
                  </td>

                  <td className="p-6 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-6 text-slate-300">
                    {item.email}
                  </td>

                  <td className="p-6">

                    <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400">

                      {item.role}

                    </span>

                  </td>

                  <td className="p-6">

                    <button
                      onClick={() =>
                        deleteDoctor(item.id)
                      }
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                    >
                      Delete
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

export default Doctors