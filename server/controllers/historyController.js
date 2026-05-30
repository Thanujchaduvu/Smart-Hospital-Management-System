const db = require("../config/db")

exports.addHistory = (req, res) => {

  const {
    patient_name,
    diagnosis,
    prescription,
    doctor_notes
  } = req.body

  const sql =
    "INSERT INTO medical_history(patient_name,diagnosis,prescription,doctor_notes) VALUES(?,?,?,?)"

  db.query(
    sql,
    [
      patient_name,
      diagnosis,
      prescription,
      doctor_notes
    ],
    (err, result) => {

      if (err) {

        console.log(err)

        return res.status(500).json({
          message: "Database Error"
        })

      }

      res.json({
        message: "Medical Record Added"
      })

    }
  )

}

exports.getHistory = (req, res) => {

  const sql =
    "SELECT * FROM medical_history"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json({
        message: "Database Error"
      })

    }

    res.json(result)

  })

}