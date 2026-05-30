const db = require("../config/db")

exports.getTests = (req, res) => {

  const sql =
    "SELECT * FROM hospital_tests ORDER BY id DESC"

  db.query(
    sql,
    (err, result) => {

      if (err) {

        return res.status(500).json(err)

      }

      res.json(result)

    }
  )

}

exports.addTest = (req, res) => {

  const {
    test_name,
    description,
    price
  } = req.body

  const sql =
    `INSERT INTO hospital_tests
    (test_name,description,price)
    VALUES(?,?,?)`

  db.query(
    sql,
    [
      test_name,
      description,
      price
    ],
    (err) => {

      if (err) {

        return res.status(500).json(err)

      }

      res.json({
        message:
          "Test Added Successfully"
      })

    }
  )

}

exports.deleteTest = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM hospital_tests WHERE id=?"

  db.query(
    sql,
    [id],
    (err) => {

      if (err) {

        return res.status(500).json(err)

      }

      res.json({
        message:
          "Test Deleted"
      })

    }
  )

}