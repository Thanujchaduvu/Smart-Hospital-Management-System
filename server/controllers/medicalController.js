const db =
require("../config/db")

exports.addRecord =
(req, res) => {

  const {
    patient_name,
    doctor_name,
    diagnosis,
    prescription,
    notes
  } = req.body

  const sql =
    `INSERT INTO medical_records
    (patient_name,doctor_name,diagnosis,prescription,notes)
    VALUES(?,?,?,?,?)`

  db.query(
    sql,
    [
      patient_name,
      doctor_name,
      diagnosis,
      prescription,
      notes
    ],
    (err) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      res.json({
        message:
          "Medical Record Added"
      })

    }
  )

}

exports.getRecords =
(req, res) => {

  const sql =
    "SELECT * FROM medical_records"

  db.query(sql,
    (err, result) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      res.json(result)

    })

}