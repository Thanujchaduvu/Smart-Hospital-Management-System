import {
  Bar
} from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function AnalyticsChart() {

  const data = {

    labels: [
      "Doctors",
      "Patients",
      "Appointments"
    ],

    datasets: [

      {
        label: "Hospital Analytics",

        data: [15, 120, 45],

        backgroundColor: [
          "#1976d2",
          "#2e7d32",
          "#ed6c02"
        ]
      }

    ]

  }

  const options = {

    responsive: true

  }

  return (

    <div style={styles.container}>

      <Bar
        data={data}
        options={options}
      />

    </div>

  )

}

const styles = {

  container: {
    width: "700px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px"
  }

}

export default AnalyticsChart