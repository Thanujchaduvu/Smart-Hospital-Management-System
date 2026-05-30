import { useNavigate } from "react-router-dom"
import {
  AdminPanelSettings,
  LocalHospital,
  Person
} from "@mui/icons-material"

function RoleSelect() {

  const navigate = useNavigate()

  const cardStyle =
    "bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400 hover:scale-105 transition rounded-3xl p-10 cursor-pointer shadow-2xl text-center"

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl">

        <div className="text-center mb-16">

          <h1 className="text-6xl font-bold text-white mb-4">
            AI Hospital
          </h1>

          <p className="text-slate-300 text-xl">
            Smart Healthcare Management System
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div
            className={cardStyle}
            onClick={() => navigate("/login/admin")}
          >

            <AdminPanelSettings
              sx={{
                fontSize: 90,
                color: "#06b6d4"
              }}
            />

            <h2 className="text-3xl font-bold text-white mt-6">
              Admin
            </h2>

            <p className="text-slate-300 mt-3">
              Manage doctors, patients and hospital
            </p>

          </div>

          <div
            className={cardStyle}
            onClick={() => navigate("/login/doctor")}
          >

            <LocalHospital
              sx={{
                fontSize: 90,
                color: "#3b82f6"
              }}
            />

            <h2 className="text-3xl font-bold text-white mt-6">
              Doctor
            </h2>

            <p className="text-slate-300 mt-3">
              Manage appointments and medical history
            </p>

          </div>

          <div
            className={cardStyle}
            onClick={() => navigate("/login/patient")}
          >

            <Person
              sx={{
                fontSize: 90,
                color: "#14b8a6"
              }}
            />

            <h2 className="text-3xl font-bold text-white mt-6">
              Patient
            </h2>

            <p className="text-slate-300 mt-3">
              Book appointments and use AI checker
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default RoleSelect