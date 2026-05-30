import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import DashboardCard from "../../components/DashboardCard"

function Dashboard() {

  return (

    <div style={styles.container}>

      <Sidebar role="patient" />

      <div style={styles.main}>

        <Navbar title="Patient Dashboard" />

        <div style={styles.cards}>

          <DashboardCard
            title="Appointments"
            value="5"
          />

          <DashboardCard
            title="Reports"
            value="3"
          />

          <DashboardCard
            title="Prescriptions"
            value="7"
          />

        </div>

      </div>

    </div>

  )

}

const styles = {

  container: {
    display: "flex",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh"
  },

  main: {
    flex: 1
  },

  cards: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap"
  }

}

export default Dashboard