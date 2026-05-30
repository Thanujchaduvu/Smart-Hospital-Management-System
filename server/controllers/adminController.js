const db = require("../config/db")
const bcrypt =
require("bcryptjs")
exports.getPatients = (req, res) => {

  const sql =
    "SELECT id,name,email,role FROM users WHERE role='patient'"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json(result)

  })

}

exports.deletePatient = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM users WHERE id=?"

  db.query(sql, [id], (err) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json({
      message:
        "Patient Deleted"
    })

  })

}

exports.getDoctors = (req, res) => {

  const sql =
    "SELECT id,name,email,role,specialization FROM users WHERE role='doctor'"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json(result)

  })

}

exports.deleteDoctor = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM users WHERE id=?"

  db.query(sql, [id], (err) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json({
      message:
        "Doctor Deleted"
    })

  })

}

exports.addDoctor = (req, res) => {

  const {
    name,
    email,
    password,
    specialization
  } = req.body

  bcrypt.hash(
    password,
    10,
    (err, hashedPassword) => {

      if (err) {

        return res.status(500).json(err)

      }

      const sql =
        "INSERT INTO users(name,email,password,role,specialization) VALUES(?,?,?,'doctor',?)"

      db.query(
        sql,
        [
          name,
          email,
          hashedPassword,
          specialization
        ],
        (err) => {

          if (err) {

            return res.status(500).json(err)

          }

          res.json({
            message:
              "Doctor Added Successfully"
          })

        }
      )

    }
  )

}