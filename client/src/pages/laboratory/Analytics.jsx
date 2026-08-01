import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="laboratory" />

      <div className="flex-1">
        <Navbar title="Laboratory Analytics" />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Laboratory Analytics
          </h1>
        </div>
      </div>
    </div>
  );
}