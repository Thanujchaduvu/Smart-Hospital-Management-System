import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function EditStaff() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">Edit Staff</h1>
        </div>
      </div>
    </div>
  );
}