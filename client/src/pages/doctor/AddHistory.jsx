import { useState } from "react"
import API from "../../api/axios"

function AddHistory() {

  const [formData, setFormData] = useState({

    patient_name: "",
    diagnosis: "",
    prescription: "",
    doctor_notes: ""

  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        "/history/add",
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

      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Add Medical Record
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none"
          />

          <textarea
            name="diagnosis"
            placeholder="Diagnosis"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none h-32"
          />

          <textarea
            name="prescription"
            placeholder="Prescription"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none h-32"
          />

          <textarea
            name="doctor_notes"
            placeholder="Doctor Notes"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none h-32"
          />

          <button
            type="submit"
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg hover:scale-105 transition"
          >
            Save Record
          </button>

        </form>

      </div>

    </div>

  )

}

export default AddHistory