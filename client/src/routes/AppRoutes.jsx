import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import RoleSelect from "../pages/auth/RoleSelect"

import AdminDashboard from "../pages/admin/Dashboard"
import Users from "../pages/admin/Users"
import Doctors from "../pages/admin/Doctors"
import Patients from "../pages/admin/Patients"
import AddDoctor from "../pages/admin/AddDoctor"
import Reports from "../pages/admin/Reports"
import ManageTests from "../pages/admin/ManageTests"
import AdminAppointments from "../pages/admin/Appointments"

import DoctorDashboard from "../pages/doctor/Dashboard"
import Appointments from "../pages/doctor/Appointments"
import AddHistory from "../pages/doctor/AddHistory"
import ViewReports from "../pages/doctor/ViewReports"

import PatientDashboard from "../pages/patient/Dashboard"
import BookAppointment from "../pages/patient/BookAppointment"
import MedicalHistory from "../pages/patient/MedicalHistory"
import SymptomChecker from "../pages/patient/SymptomChecker"
import MyAppointments
from "../pages/patient/MyAppointments"
import UploadReport
from "../pages/patient/UploadReport"

import ProtectedRoute from "../components/ProtectedRoute"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
  path="/"
  element={<RoleSelect />}
/>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/add-doctor"
  element={
    <ProtectedRoute role="admin">
      <AddDoctor />
    </ProtectedRoute>
  }
/>
        <Route
         path="/admin/users"
         element={
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        }
       />

       <Route
  path="/admin/appointments"
  element={
    <ProtectedRoute role="admin">
      <AdminAppointments />
    </ProtectedRoute>
  }
/>

       <Route
        path="/admin/doctors"
        element={
         <ProtectedRoute role="admin">
          <Doctors />
         </ProtectedRoute>
       }
       />

      <Route
        path="/admin/patients"
        element={
          <ProtectedRoute role="admin">
            <Patients />
          </ProtectedRoute>
       }

     />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/reports"
  element={
    <ProtectedRoute role="admin">
      <Reports />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/tests"
  element={
    <ProtectedRoute role="admin">
      <ManageTests />
    </ProtectedRoute>
  }
/>

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/history"
          element={
            <ProtectedRoute role="doctor">
              <AddHistory />
            </ProtectedRoute>
          }
        />

        <Route
  path="/patient/appointments"
  element={
    <ProtectedRoute role="patient">
      <MyAppointments />
    </ProtectedRoute>
  }
/>

        <Route
  path="/patient/upload-report"
  element={<UploadReport />}
/>

<Route
  path="/doctor/reports"
  element={<ViewReports />}
/>

        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patient/book"
          element={
            <ProtectedRoute role="patient">
              <BookAppointment />
            </ProtectedRoute>
         }
        />
        <Route
          path="/patient/history"
          element={
            <ProtectedRoute role="patient">
              <MedicalHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/symptoms"
          element={
            <ProtectedRoute role="patient">
              <SymptomChecker />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default AppRoutes