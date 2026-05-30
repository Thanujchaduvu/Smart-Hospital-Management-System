import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import DashboardCard from "../../components/DashboardCard"
import AnalyticsChart from "../../components/AnalyticsChart"

function Dashboard() {

  return (

    <div style={styles.container}>

      <Sidebar role="admin" />

      <div style={styles.main}>

        <Navbar title="Admin Dashboard" />

        <div style={styles.cards}>

          <DashboardCard
            title="Doctors"
            value="15"
          />

          <DashboardCard
            title="Patients"
            value="120"
          />

          <DashboardCard
            title="Appointments"
            value="45"
          />

        </div>
        
        <AnalyticsChart />
        
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