import {
  useEffect,
  useState
}
from "react"

import API
from "../../api/axios"

function MedicalRecords() {

  const [records,
    setRecords] =
    useState([])

  const fetchRecords =
    async () => {

      try {

        const res =
          await API.get(
            "/medical"
          )

        setRecords(
          res.data
        )

      }

      catch (err) {

        console.log(err)

      }

    }

  useEffect(() => {

    fetchRecords()

  }, [])

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Medical Records
      </h1>

      <div className="grid gap-6">

        {
          records.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >

              <h2 className="text-2xl font-bold mb-4">
                {item.patient_name}
              </h2>

              <p>
                <span className="font-bold">
                  Doctor:
                </span>

                {" "}
                {item.doctor_name}
              </p>

              <p className="mt-4">
                <span className="font-bold">
                  Diagnosis:
                </span>

                {" "}
                {item.diagnosis}
              </p>

              <p className="mt-4">
                <span className="font-bold">
                  Prescription:
                </span>

                {" "}
                {item.prescription}
              </p>

              <p className="mt-4">
                <span className="font-bold">
                  Notes:
                </span>

                {" "}
                {item.notes}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default MedicalRecords