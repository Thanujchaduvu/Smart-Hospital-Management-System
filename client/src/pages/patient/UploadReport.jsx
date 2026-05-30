import { useState }
from "react"

import API
from "../../api/axios"

function UploadReport() {

  const [patientName,
    setPatientName] =
    useState("")

  const [file,
    setFile] =
    useState(null)

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      const formData =
        new FormData()

      formData.append(
        "patient_name",
        patientName
      )

      formData.append(
        "report",
        file
      )

      try {

        const res =
          await API.post(
            "/reports/upload",
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

      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl p-10">

        <h1 className="text-5xl font-bold mb-8">
          Upload Report
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Patient Name"
            onChange={(e)=>

              setPatientName(
                e.target.value
              )

            }
            className="w-full p-5 rounded-2xl bg-slate-800"
          />

          <input
            type="file"
            onChange={(e)=>

              setFile(
                e.target.files[0]
              )

            }
            className="w-full p-5 rounded-2xl bg-slate-800"
          />

          <button
            type="submit"
            className="w-full p-5 rounded-2xl bg-cyan-600"
          >
            Upload Report
          </button>

        </form>

      </div>

    </div>

  )

}

export default UploadReport