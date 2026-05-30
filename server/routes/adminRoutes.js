const express = require("express")

const router = express.Router()

const {
  getPatients,
  deletePatient

} = require(
  "../controllers/adminController"
)

router.get(
  "/patients",
  getPatients
)

router.delete(
  "/patients/:id",
  deletePatient
)

module.exports = router

const {
  getDoctors,
  deleteDoctor
} = require(
  "../controllers/adminController"
)

router.get(
  "/doctors",
  getDoctors
)

router.delete(
  "/doctors/:id",
  deleteDoctor
)


const {
  addDoctor
} = require(
  "../controllers/adminController"
)

router.post(
  "/add-doctor",
  addDoctor
)