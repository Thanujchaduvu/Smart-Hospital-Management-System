import { useEffect, useState } from "react"
import API from "../../api/axios"

function MedicalHistory() {

  const [history, setHistory] = useState([])

  const fetchHistory = async () => {

    try {

      const res = await API.get(
        "/history/all"
      )

      setHistory(res.data)

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchHistory()

  }, [])

  return (

    <div style={styles.container}>

      <h1>Medical History</h1>

      {
        history.map((item) => (

          <div
            key={item.id}
            style={styles.card}
          >

            <h2>
              {item.patient_name}
            </h2>

            <p>

              <strong>
                Diagnosis:
              </strong>

              {item.diagnosis}

            </p>

            <p>

              <strong>
                Prescription:
              </strong>

              {item.prescription}

            </p>

            <p>

              <strong>
                Doctor Notes:
              </strong>

              {item.doctor_notes}

            </p>

          </div>

        ))
      }

    </div>

  )

}

const styles = {

  container: {
    padding: "20px"
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px gray"
  }

}

export default MedicalHistory