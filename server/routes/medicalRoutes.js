const express =
require("express")

const router =
express.Router()

const {
  addRecord,
  getRecords
} = require(
  "../controllers/medicalController"
)

router.post(
  "/add",
  addRecord
)

router.get(
  "/",
  getRecords
)

module.exports =
router