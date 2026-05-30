const router = require("express").Router()

const authController = require("../controllers/authController")

const {
  getUsers,
  deleteUser,
  googleLogin
} = require(
  "../controllers/authController"
)

router.get(
  "/users",
  getUsers
)

router.delete(
  "/users/:id",
  deleteUser
)
router.post(
  "/register",
  authController.register
)

router.post(
  "/login",
  authController.login
)

router.post(
  "/google-login",
  googleLogin
)

module.exports = router