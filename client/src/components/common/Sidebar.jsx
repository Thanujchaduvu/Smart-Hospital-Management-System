import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaBoxes,
  FaPrescriptionBottleAlt,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaHospital,
  FaChartBar,
  FaMoneyBill,
  FaCog,
  FaSignOutAlt,
  FaFlask,
  FaVial,
  FaCapsules,
  FaFileMedical,
} from "react-icons/fa";
import { MdScience } from "react-icons/md";

export default function Sidebar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  // ===========================
  // ADMIN MENU
  // ===========================

  const adminMenus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Patients",
      path: "/admin/patients",
      icon: <FaUsers />,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: <FaHospital />,
    },
    {
      name: "Billing",
      path: "/admin/billing",
      icon: <FaMoneyBill />,
    },
    {
      name: "Laboratory Staff",
      path: "/admin/laboratory-staff",
      icon: <MdScience />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
    {
      name: "Pharmacy Staff",
      path: "/admin/pharmacy-staff",
      icon: <FaCapsules />,
    },
  ];

  // ===========================
  // DOCTOR MENU
  // ===========================

  const doctorMenus = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Patients",
      path: "/doctor/patients",
      icon: <FaUsers />,
    },
    {
      name: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: "💊",
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: "👤",
    },
  ];

  // ===========================
  // PATIENT MENU
  // ===========================

  const patientMenus = [
    {
      name: "Dashboard",
      path: "/patient/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Book Appointment",
      path: "/patient/book-appointment",
      icon: <FaCalendarAlt />,
    },
    {
      name: "My Appointments",
      path: "/patient/appointments",
      icon: "📋",
    },
    {
      name: "Billing",
      path: "/patient/billing",
      icon: "💳",
    },
    {
      name: "Lab Reports",
      path: "/patient/lab-reports",
      icon: "🧪",
    },
    {
      name: "Pharmacy",
      path: "/patient/pharmacy",
      icon: "💊",
    },
    {
      name: "Prescriptions",
      path: "/patient/prescriptions",
      icon: "📄",
    },
    {
      name: "Profile",
      path: "/patient/profile",
      icon: "👤",
    },
    {
      name: "Settings",
      path: "/patient/settings",
      icon: "⚙️",
    },
  ];

  // ===========================
  // LABORATORY MENU
  // ===========================

  const laboratoryMenus = [
    {
      name: "Dashboard",
      path: "/laboratory/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Laboratory Tests",
      path: "/laboratory/tests",
      icon: <FaFlask />,
    },
    {
      name: "Upload Reports",
      path: "/laboratory/upload-report",
      icon: <FaVial />,
    },
    {
      name: "Reports",
      path: "/laboratory/reports",
      icon: <FaFileMedical />,
    },
    {
      name: "Analytics",
      path: "/laboratory/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/laboratory/settings",
      icon: <FaCog />,
    },
  ];

  const pharmacyMenus = [
  {
    name: "Dashboard",
    path: "/pharmacy/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Inventory",
    path: "/pharmacy/inventory",
    icon: <FaBoxes />,
  },
  {
    name: "Medicines",
    path: "/pharmacy/medicines",
    icon: <FaCapsules />,
  },
  {
    name: "Prescriptions",
    path: "/pharmacy/prescriptions",
    icon: <FaPrescriptionBottleAlt />,
  },
  {
    name: "Sales",
    path: "/pharmacy/sales",
    icon: <FaShoppingCart />,
  },
  {
    name: "Billing",
    path: "/pharmacy/billing",
    icon: <FaMoneyBillWave />,
  },
  {
    name: "Analytics",
    path: "/pharmacy/analytics",
    icon: <FaChartBar />,
  },
  {
    name: "Settings",
    path: "/pharmacy/settings",
    icon: <FaCog />,
  },
];

  // ===========================
  // SELECT MENU
  // ===========================

  let menu = [];

  switch (role) {
    case "admin":
      menu = adminMenus;
      break;

    case "doctor":
      menu = doctorMenus;
      break;

    case "patient":
      menu = patientMenus;
      break;

    case "laboratory":
      menu = laboratoryMenus;
      break;
    
    case "pharmacy":
      menu = pharmacyMenus;
      break;

    default:
      menu = [];
  }

  // ===========================
  // LOGOUT
  // ===========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-xl flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-center">
          🏥 AI Hospital
        </h1>

      </div>

      {/* Menu */}

      <nav className="flex-1 p-4 space-y-2">

        {menu.length > 0 ? (

          menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>

            </Link>

          ))

        ) : (

          <p className="text-center text-red-400">
            No menu available for role: {role}
          </p>

        )}

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}