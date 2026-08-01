import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          AI Hospital Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome {user?.name || "Admin"}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}