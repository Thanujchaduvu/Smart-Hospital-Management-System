import { useState } from "react"
import API from "../../api/axios"

function AddDoctor() {

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      specialization: ""

    })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/admin/add-doctor",
        formData
      )

      alert(res.data.message)

    }

    catch (err) {

      console.log(err)

      alert("Failed")

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10">

        <h1 className="text-5xl font-bold mb-8">
          Add Doctor
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none"
          />

          <button
            type="submit"
            className="w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
          >
            Create Doctor
          </button>

        </form>

      </div>

    </div>

  )

}

export default AddDoctor