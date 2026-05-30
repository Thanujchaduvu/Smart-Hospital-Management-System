const express =
require("express")

const router =
express.Router()

const {
  updateAvailability,
  getAvailableDoctors
} = require(
  "../controllers/doctorController"
)

router.put(
  "/availability",
  updateAvailability
)

router.get(
  "/available",
  getAvailableDoctors
)

module.exports =
router