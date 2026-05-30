import { useState }
from "react"

import API
from "../../api/axios"

function AddRecord() {

  const [formData,
    setFormData] =
    useState({

      patient_name: "",
      doctor_name: "",
      diagnosis: "",
      prescription: "",
      notes: ""

    })

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      })

    }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        const res =
          await API.post(
            "/medical/add",
            formData
          )

        alert(
          res.data.message
        )

      }

      catch (err) {

        console.log(err)

      }

    }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-10 border border-slate-800">

        <h1 className="text-5xl font-bold mb-8">
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
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700"
          />

          <input
            type="text"
            name="doctor_name"
            placeholder="Doctor Name"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700"
          />

          <textarea
            name="diagnosis"
            placeholder="Diagnosis"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 h-32"
          />

          <textarea
            name="prescription"
            placeholder="Prescription"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 h-32"
          />

          <textarea
            name="notes"
            placeholder="Additional Notes"
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 h-32"
          />

          <button
            type="submit"
            className="w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
          >
            Save Record
          </button>

        </form>

      </div>

    </div>

  )

}

export default AddRecord