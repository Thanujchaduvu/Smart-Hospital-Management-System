import { useNavigate } from "react-router-dom"

function Navbar({ title }) {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    navigate("/")

  }

  return (

    <div style={styles.navbar}>

      <h2>{title}</h2>

      <button
        style={styles.button}
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  )

}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0px 0px 5px gray"
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }

}

export default Navbar