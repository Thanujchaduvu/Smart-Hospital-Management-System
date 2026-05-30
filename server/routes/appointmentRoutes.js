const express =
require("express")

const router =
express.Router()

const {

  bookAppointment,
  getAppointments,
  updateAppointment,
  payAppointment

} = require(
  "../controllers/appointmentController"
)

router.post(
  "/book",
  bookAppointment
)

router.get(
  "/",
  getAppointments
)

router.put(
  "/:id",
  updateAppointment
)

router.put(
  "/pay/:id",
  payAppointment
)

module.exports =
router