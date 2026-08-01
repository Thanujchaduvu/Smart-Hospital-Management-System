import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Protected Route
import ProtectedRoute from "../components/common/ProtectedRoute";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import DoctorManagement from "../pages/admin/DoctorManagement";
import Patients from "../pages/admin/Patients";
import Appointments from "../pages/admin/Appointments";
import Reports from "../pages/admin/Reports";
import AdminBilling from "../pages/admin/Billing";
import Departments from "../pages/admin/Departments";
import AdminSettings from "../pages/admin/Settings";
import AddDoctor from "../pages/admin/AddDoctor";
import LaboratoryStaff from "../pages/admin/LaboratoryStaff";
import PharmacyStaff from "../pages/admin/PharmacyStaff";


// Patient Dashboard
import PatientDashboard from "../pages/patient/Dashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import Billing from "../pages/patient/Billing";
import LabReports from "../pages/patient/LabReports";
import Pharmacy from "../pages/patient/Pharmacy";
import Prescriptions from "../pages/patient/Prescriptions";
import Profile from "../pages/patient/Profile";
import Settings from "../pages/patient/Settings";

// Doctor Dashboard
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";

//Laboratory
import LaboratoryDashboard from "../pages/laboratory/Dashboard";
import LaboratoryTests from "../pages/laboratory/Tests";
import UploadReport from "../pages/laboratory/UploadReport";
import LaboratoryReports from "../pages/laboratory/Reports";
import LaboratoryAnalytics from "../pages/laboratory/Analytics";
import LaboratorySettings from "../pages/laboratory/Settings";

//pharmacy
import PharmacyDashboard from "../pages/pharmacy/Dashboard";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Authentication ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ================= Admin ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <DoctorManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors/add"
          element={
            <ProtectedRoute role="admin">
              <AddDoctor />
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
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <Appointments />
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
          path="/admin/billing"
          element={
            <ProtectedRoute role="admin">
              <AdminBilling />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute role="admin">
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laboratory-staff"
          element={
            <ProtectedRoute role="admin">
              <LaboratoryStaff />
            </ProtectedRoute>
         }
        />

        <Route
          path="/admin/pharmacy-staff"
          element={
            <ProtectedRoute role="admin">
              <PharmacyStaff />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* ================= Patient ================= */}

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute role="patient">
              <BookAppointment />
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
          path="/patient/billing"
          element={<ProtectedRoute role="patient">
            <Billing />
          </ProtectedRoute>
        }
         />

        <Route
          path="/patient/lab-reports" 
          element={
            <ProtectedRoute role="patient">
              <LabReports />
            </ProtectedRoute>} />

        <Route 
          path="/patient/pharmacy" 
          element={<ProtectedRoute role="patient">
            <Pharmacy />
          </ProtectedRoute>} />

        <Route 
          path="/patient/prescriptions" 
          element={<ProtectedRoute role="patient">
            <Prescriptions />
          </ProtectedRoute>} />

        <Route 
          path="/patient/profile" 
          element={<ProtectedRoute role="patient">
            <Profile />
          </ProtectedRoute>} />

        <Route 
          path="/patient/settings" element={<ProtectedRoute role="patient">
            <Settings />
          </ProtectedRoute>} />



        {/* ================= Doctor ================= */}

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
         }
        />
        {/* ================= Laboratory ================= */}
        
        <Route
          path="/laboratory/dashboard"
          element={
            <ProtectedRoute role="laboratory">
              <LaboratoryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laboratory/tests"
          element={
            <ProtectedRoute role="laboratory">
              <LaboratoryTests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laboratory/upload-report"
          element={
            <ProtectedRoute role="laboratory">
              <UploadReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laboratory/reports"
          element={
            <ProtectedRoute role="laboratory">
              <LaboratoryReports />
            </ProtectedRoute>
         }
        />

        <Route
          path="/laboratory/analytics"
          element={
            <ProtectedRoute role="laboratory">
              <LaboratoryAnalytics />
            </ProtectedRoute>
         }
        />

        <Route
          path="/laboratory/settings"
          element={
            <ProtectedRoute role="laboratory">
              <LaboratorySettings />
            </ProtectedRoute>
        }
        />
        
        {/* ================= pharmacy ================= */}

        <Route
          path="/pharmacy/dashboard"
          element={
            <ProtectedRoute role="pharmacy">
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}