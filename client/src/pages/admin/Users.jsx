import { useEffect, useState } from "react"
import API from "../../api/axios"

function Users() {

  const [users, setUsers] =
    useState([])

  const fetchUsers = async () => {

    try {

      const res = await API.get(
        "/auth/users"
      )

      setUsers(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchUsers()

  }, [])

  const deleteUser = async (id) => {

    try {

      await API.delete(
        `/auth/users/${id}`
      )

      fetchUsers()

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
            User Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage doctors and patients
          </p>

        </div>

      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="text-left p-6">
                Name
              </th>

              <th className="text-left p-6">
                Email
              </th>

              <th className="text-left p-6">
                Role
              </th>

              <th className="text-left p-6">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >

                  <td className="p-6 font-semibold">
                    {user.name}
                  </td>

                  <td className="p-6 text-slate-300">
                    {user.email}
                  </td>

                  <td className="p-6">

                    <span className={`
                      px-4 py-2 rounded-full text-sm font-semibold

                      ${
                        user.role === "admin"
                        ?
                        "bg-purple-500/20 text-purple-400"
                        :
                        user.role === "doctor"
                        ?
                        "bg-cyan-500/20 text-cyan-400"
                        :
                        "bg-green-500/20 text-green-400"
                      }
                    `}>

                      {user.role}

                    </span>

                  </td>

                  <td className="p-6">

                    <button
                      onClick={() =>
                        deleteUser(user.id)
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

export default Users