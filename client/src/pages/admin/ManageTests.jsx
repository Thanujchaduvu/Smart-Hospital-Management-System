import { useEffect, useState } from "react"
import API from "../../api/axios"

function ManageTests() {

  const [tests, setTests] = useState([])

  const [formData, setFormData] =
    useState({

      test_name: "",
      description: "",
      price: ""

    })

  useEffect(() => {

    fetchTests()

  }, [])

  const fetchTests = async () => {

    try {

      const res =
        await API.get("/tests")

      setTests(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]:
        e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await API.post(
        "/tests",
        formData
      )

      fetchTests()

    }

    catch (err) {

      console.log(err)

    }

  }

  return (

    <div className="p-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Manage Tests
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mb-8"
      >

        <input
          type="text"
          name="test_name"
          placeholder="Test Name"
          onChange={handleChange}
          className="p-4 rounded-xl bg-slate-800"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-4 rounded-xl bg-slate-800"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="p-4 rounded-xl bg-slate-800"
        />

        <button
          className="bg-blue-600 p-4 rounded-xl"
        >
          Add Test
        </button>

      </form>

      {
        tests.map((test) => (

          <div
            key={test.id}
            className="bg-slate-900 p-5 rounded-xl mb-3"
          >

            <h2>{test.test_name}</h2>

            <p>{test.description}</p>

            <p>₹{test.price}</p>

          </div>

        ))
      }

    </div>

  )

}

export default ManageTests