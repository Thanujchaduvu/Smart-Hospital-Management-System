import { Link } from "react-router-dom"

function Sidebar({ role }) {

  return (

    <div className="w-[280px] min-h-screen bg-slate-950 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        AI Hospital
      </h1>

      <div className="flex flex-col gap-4">

        {
          role === "admin" && (
            <>
              <Link className={styles.link} to="/admin">
                Dashboard
              </Link>

              <Link className={styles.link} to="/admin/doctors">
                Doctors
              </Link>

              <Link className={styles.link} to="/admin/add-doctor">
                Add Doctor
              </Link>

              <Link className={styles.link} to="/admin/patients">
                Patients
              </Link>

              <Link className={styles.link} to="/admin/users">
                Users
              </Link>

              <Link className={styles.link} to="/admin/reports">
                Reports
              </Link>

              <Link className={styles.link} to="/admin/tests">
                Manage Tests
              </Link>

              <Link className={styles.link}to="/admin/appointments">
                Appointments
              </Link>
            </>
          )
        }

        {
          role === "doctor" && (
            <>
              <Link className={styles.link} to="/doctor">
                Dashboard
              </Link>

              <Link className={styles.link} to="/doctor/appointments">
                Appointments
              </Link>

              <Link className={styles.link} to="/doctor/history">
                Add History
              </Link>

              <Link className={styles.link} to="/doctor/reports">
               Patient Reports
              </Link>
            </>
          )
        }

        {
          role === "patient" && (
            <>
              <Link className={styles.link} to="/patient">
                Dashboard
              </Link>

              <Link className={styles.link} to="/patient/upload-report">
                Upload Reports
              </Link>

              <Link className={styles.link} to="/patient/book">
                Book Appointment
              </Link>

              <Link className={styles.link} to="/patient/history">
                Medical History
              </Link>

              <Link className={styles.link} to="/patient/symptoms">
                AI Checker
              </Link>

              <Link className={styles.link} to="/patient/appointments">
                My Appointments
              </Link>
            </>
          )
        }

      </div>

    </div>

  )

}

const styles = {

  link:
    "p-4 rounded-2xl bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white transition text-lg"

}

export default Sidebar