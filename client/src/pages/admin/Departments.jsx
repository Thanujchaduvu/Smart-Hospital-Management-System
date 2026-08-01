import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setFiltered(
      departments.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, departments]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDepartments(res.data.departments);
      setFiltered(res.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  const saveDepartment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/departments/${editingId}`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/departments",
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setName("");
      setDescription("");
      setEditingId(null);

      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  const editDepartment = (dept) => {
    setEditingId(dept.id);
    setName(dept.name);
    setDescription(dept.description);
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar title="Departments" />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Departments
          </h1>

          <div className="bg-white rounded-lg shadow p-6 mb-6">

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="border rounded-lg p-3"
                placeholder="Department Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="border rounded-lg p-3"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

            </div>

            <button
              onClick={saveDepartment}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {editingId ? "Update" : "Add"} Department
            </button>

          </div>

          <input
            className="border rounded-lg p-3 w-full mb-6"
            placeholder="Search Department..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="bg-white rounded-lg shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-4">ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filtered.map((dept) => (

                  <tr
                    key={dept.id}
                    className="border-b text-center"
                  >

                    <td className="p-4">
                      {dept.id}
                    </td>

                    <td>{dept.name}</td>

                    <td>{dept.description}</td>

                    <td>

                      <button
                        onClick={() =>
                          editDepartment(dept)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteDepartment(dept.id)
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}