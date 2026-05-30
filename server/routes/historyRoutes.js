const router = require("express").Router()

const {
  addHistory,
  getHistory
} = require("../controllers/historyController")

router.post(
  "/add",
  addHistory
)

router.get(
  "/all",
  getHistory
)

module.exports = router