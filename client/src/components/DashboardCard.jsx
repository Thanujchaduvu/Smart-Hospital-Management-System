function DashboardCard({ title, value }) {

  return (

    <div style={styles.card}>

      <h2>{title}</h2>

      <h1>{value}</h1>

    </div>

  )

}

const styles = {

  card: {
    background:
      "linear-gradient(135deg,#2563eb,#1e40af)",
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    width: "260px",
    transition: "0.3s"
  }

}

export default DashboardCard