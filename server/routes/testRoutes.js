const express =
require("express")

const router =
express.Router()

const {

  getTests,
  addTest,
  deleteTest

} = require(
  "../controllers/testController"
)

router.get(
  "/",
  getTests
)

router.post(
  "/",
  addTest
)

router.delete(
  "/:id",
  deleteTest
)

module.exports =
router