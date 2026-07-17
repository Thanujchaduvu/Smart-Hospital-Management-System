import {
  useEffect,
  useState
}
from "react"

import API
from "../../api/axios"

function ViewReports() {

  const [reports,
    setReports] =
    useState([])

  const fetchReports =
    async () => {

      try {

        const res =
          await API.get(
            "/reports"
          )

        setReports(
          res.data
        )

      }

      catch (err) {

        console.log(err)

      }

    }

  useEffect(() => {

    fetchReports()

  }, [])

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Patient Reports
      </h1>

      <div className="grid gap-6">

        {
          reports.map(
            (report) => (

            <div
              key={report.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >

              <h2 className="text-2xl font-bold">
                {report.patient_name}
              </h2>

              <p className="text-slate-400 mt-2">
                {report.file_name}
              </p>

              <a
  href={`https://smart-hospital-management-system-bqw6.onrender.com${report.file_url}`}
  target="_blank"
  rel="noreferrer"
  className="inline-block mt-4 px-6 py-3 bg-cyan-600 rounded-xl"
>
  View Report
</a>

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default ViewReports