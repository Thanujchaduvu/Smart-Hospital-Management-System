const db = require("../config/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const sql =
      "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)"

    db.query(
      sql,
      [name, email, hashedPassword, role],
      (err, result) => {

        if (err) {

          console.log(err)

          return res.status(500).json({
            message: err.message
          })

        }

        const token = jwt.sign(
          {
            id: result.insertId,
            role
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        )

        res.json({
          message: "User Registered",
          token
        })

      }
    )

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

}

exports.login = (req, res) => {

  const { email, password } = req.body

  const sql =
    "SELECT * FROM users WHERE email = ?"

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json(err)
    }

    if (result.length === 0) {

      return res.status(404).json({
        message: "User not found"
      })

    }

    const user = result[0]

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      })

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )

    res.json({
      message: "Login Success",
      token,
      role: user.role
    })

  })

}
exports.googleLogin = (req, res) => {

  const {
    name,
    email
  } = req.body

  const checkSql =
    "SELECT * FROM users WHERE email=?"

  db.query(
    checkSql,
    [email],
    (err, result) => {

      if (err) {

        return res.status(500)
          .json(err)

      }

      if (result.length > 0) {

        return res.json({
          message:
            "Login Success",

          role:
            result[0].role
        })

      }

      const sql =
        `INSERT INTO users
        (name,email,password,role)
        VALUES(?,?,?,'patient')`

      db.query(
        sql,
        [name,email,"google-auth"],
        (err) => {

          if (err) {

            return res.status(500)
              .json(err)

          }

          res.json({
            message:
              "Google User Added",
            role:
              "patient"
          })

        }
      )

    }
  )

}

exports.getUsers = (req, res) => {

  const sql =
    "SELECT id,name,email,role FROM users"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json(result)

  })

}

exports.deleteUser = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM users WHERE id=?"

  db.query(sql, [id], (err) => {

    if (err) {

      return res.status(500).json(err)

    }

    res.json({
      message: "User Deleted"
    })

  })

}