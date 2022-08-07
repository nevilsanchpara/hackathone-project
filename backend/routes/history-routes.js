const express = require("express");
const {addHistory, getHistory} = require("../controllers/historyController");

const router = express.Router();

router.post("/addHistory", addHistory);
router.get("/getHistory", getHistory);
// router.get("/positions", getAllPositions);
// router.get("/hi", hi);

module.exports = {
  routes: router,
};
