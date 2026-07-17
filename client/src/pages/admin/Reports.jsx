import { useEffect, useState } from "react"
import API from "../../api/axios"

function Reports() {

  const [reports, setReports] = useState([])

  useEffect(() => {

    fetchReports()

  }, [])

  const fetchReports = async () => {

    try {

      const res =
        await API.get("/reports")

      setReports(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  return (

    <div className="p-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Patient Reports
      </h1>

      <div className="grid gap-4">

        {
          reports.map((report) => (

            <div
              key={report.id}
              className="bg-slate-900 p-6 rounded-2xl"
            >

              <h2 className="font-bold">
                {report.patient_name}
              </h2>

              <p>
                {report.file_name}
              </p>

              <a
  href={`https://smart-hospital-management-system-bqw6.onrender.com${report.file_url}`}
  target="_blank"
  rel="noreferrer"
  className="text-cyan-400"
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

export default Reports