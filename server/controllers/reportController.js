const db = require("../config/db")

exports.uploadReport = (req, res) => {

  const { patient_name } = req.body

  if (!req.file) {

    return res.status(400).json({
      message: "No file uploaded"
    })

  }

  const file_name = req.file.filename

  const file_url =
    `/uploads/${file_name}`

  const sql =
    `INSERT INTO patient_reports
    (patient_name,file_name,file_url)
    VALUES(?,?,?)`

  db.query(
    sql,
    [
      patient_name,
      file_name,
      file_url
    ],
    (err) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      res.json({
        message:
          "Report Uploaded Successfully"
      })

    }
  )

}

exports.getReports =
(req, res) => {

  const sql =
    "SELECT * FROM patient_reports ORDER BY id DESC"

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