import { useState } from "react";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function UploadReport() {

  const [formData, setFormData] = useState({

    patient: "",

    doctor: "",

    category: "",

    result: "",

    remarks: "",

    report: null,

  });

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar role="laboratory" />

      <div className="flex-1">

        <Navbar title="Upload Laboratory Report" />

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl">

            <h1 className="text-3xl font-bold mb-8">
              Upload Laboratory Report
            </h1>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 font-medium">
                  Patient
                </label>

                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3"
                  value={formData.patient}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      patient:e.target.value
                    })
                  }
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Doctor
                </label>

                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3"
                  value={formData.doctor}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      doctor:e.target.value
                    })
                  }
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Test Category
                </label>

                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3"
                  value={formData.category}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      category:e.target.value
                    })
                  }
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Report PDF
                </label>

                <input
                  type="file"
                  className="w-full border rounded-lg px-4 py-3"
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      report:e.target.files[0]
                    })
                  }
                />

              </div>

              <div className="col-span-2">

                <label className="block mb-2 font-medium">
                  Result
                </label>

                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3"
                  value={formData.result}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      result:e.target.value
                    })
                  }
                />

              </div>

              <div className="col-span-2">

                <label className="block mb-2 font-medium">
                  Remarks
                </label>

                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3"
                  value={formData.remarks}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      remarks:e.target.value
                    })
                  }
                />

              </div>

            </div>

            <button
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Upload Report
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}