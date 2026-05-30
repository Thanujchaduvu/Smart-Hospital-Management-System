const db = require("../config/db")

exports.bookAppointment = (req, res) => {

  const {
    patient_name,
    doctor_name,
    appointment_date
  } = req.body

  const sql =
    "INSERT INTO appointments(patient_name,doctor_name,appointment_date) VALUES(?,?,?)"

  db.query(
    sql,
    [
      patient_name,
      doctor_name,
      appointment_date
    ],
    (err, result) => {

      if (err) {

        console.log(err)

        return res.status(500).json({
          message: "Database Error"
        })

      }

      res.json({
        message: "Appointment Booked"
      })

    }
  )

}

exports.getAppointments = (req, res) => {

  const sql =
    "SELECT * FROM appointments ORDER BY id DESC"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json(result)

  })

}

exports.updateAppointmentStatus = (req, res) => {

  const { id } = req.params

  const { status } = req.body

  const sql =
    "UPDATE appointments SET status = ? WHERE id = ?"

  db.query(
    sql,
    [status, id],
    (err, result) => {

      if (err) {

        console.log(err)

        return res.status(500).json({
          message: "Database Error"
        })

      }

      res.json({
        message: "Status Updated"
      })

    }
  )

}
exports.updateAppointment =
(req, res) => {

  const { id } =
    req.params

  const { status } =
    req.body

  const sql =
    `UPDATE appointments
     SET status=?,
     payment_status='Pending'
     WHERE id=?`

  db.query(
    sql,
    [status,id],
    (err) => {

      if (err) {

        return res
          .status(500)
          .json(err)

      }

      res.json({
        message:
          "Appointment Updated"
      })

    }
  )

}

exports.payAppointment = (req, res) => {

  const { id } = req.params

  const sql =
    `UPDATE appointments
     SET payment_status='Paid'
     WHERE id=?`

  db.query(
    sql,
    [id],
    (err) => {

      if (err) {

        return res
          .status(500)
          .json(err)

      }

      res.json({
        message:
          "Payment Successful"
      })

    }
  )

}