import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="laboratory" />

      <div className="flex-1">
        <Navbar title="Laboratory Settings" />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Laboratory Settings
          </h1>
        </div>
      </div>
    </div>
  );
}