import { useEffect, useState }
from "react"

import API
from "../../api/axios"

function BookAppointment() {

  const [doctors,
    setDoctors] =
    useState([])

  const [formData,
    setFormData] =
    useState({

      patient_name: "",
      doctor_name: "",
      appointment_date: ""

    })

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      })

    }

  const fetchDoctors =
    async () => {

      try {

        const res =
          await API.get(
            "/doctor/available"
          )

        setDoctors(
          res.data
        )

      }

      catch (err) {

        console.log(err)

      }

    }

  useEffect(() => {

    fetchDoctors()

  }, [])

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        const res =
          await API.post(
            "/appointments/book",
            formData
          )

        alert(
          res.data.message
        )

        setFormData({

          patient_name: "",
          doctor_name: "",
          appointment_date: ""

        })

      }

      catch (err) {

        console.log(err)

        alert(
          "Booking Failed"
        )

      }

    }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold mb-3">
          Book Appointment
        </h1>

        <p className="text-slate-400 mb-10">
          Book appointments with available doctors
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={
              formData.patient_name
            }
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
          />

          <select
            name="doctor_name"
            value={
              formData.doctor_name
            }
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
          >

            <option value="">
              Select Available Doctor
            </option>

            {
              doctors.map(
                (doc, index) => (

                <option
                  key={index}
                  value={doc.name}
                >

                  {doc.name}
                  {" - "}
                  {doc.specialization}

                </option>

              ))
            }

          </select>

          <input
            type="date"
            name="appointment_date"
            value={
              formData.appointment_date
            }
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            className="w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold hover:scale-105 transition"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>

  )

}

export default BookAppointment