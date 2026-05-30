const express =
require("express")

const router =
express.Router()

const multer =
require("multer")

const path =
require("path")

const {

  uploadReport,
  getReports

} = require(
  "../controllers/reportController"
)

const storage =
multer.diskStorage({

  destination:
  (req,file,cb) => {

    cb(
      null,
      "uploads"
    )

  },

  filename:
  (req,file,cb) => {

    cb(
      null,
      Date.now()
      + "-"
      + file.originalname
    )

  }

})

const upload =
multer({
  storage
})

router.post(
  "/upload",
  upload.single("report"),
  uploadReport
)

router.get(
  "/",
  getReports
)

module.exports =
router