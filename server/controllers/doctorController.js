const db =
require("../config/db")

exports.updateAvailability =
(req, res) => {

  const {
    email,
    isAvailable
  } = req.body

  const sql =
    "UPDATE users SET isAvailable=? WHERE email=?"

  db.query(
    sql,
    [isAvailable,email],
    (err) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      res.json({
        message:
          "Availability Updated"
      })

    }
  )

}

exports.getAvailableDoctors =
(req, res) => {

  const sql =
    `SELECT name,specialization
    FROM users
    WHERE role='doctor'
    AND isAvailable=true`

  db.query(
    sql,
    (err,result) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      res.json(result)

    }
  )

}