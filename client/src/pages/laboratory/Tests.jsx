import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Tests() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="laboratory" />

      <div className="flex-1">
        <Navbar title="Laboratory Tests" />

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Laboratory Tests
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all laboratory tests here.
            </p>

            <div className="mt-8">

              <table className="min-w-full border">

                <thead className="bg-blue-600 text-white">

                  <tr>

                    <th className="px-4 py-3 text-left">
                      Patient
                    </th>

                    <th className="px-4 py-3 text-left">
                      Doctor
                    </th>

                    <th className="px-4 py-3 text-left">
                      Test
                    </th>

                    <th className="px-4 py-3 text-left">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td className="px-4 py-4">
                      No Data
                    </td>

                    <td>-</td>

                    <td>-</td>

                    <td>-</td>

                    <td>-</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}