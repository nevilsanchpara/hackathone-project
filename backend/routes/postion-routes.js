/** @format */

const express = require("express");
const {
  addPostion,
  getAllPositions,
  hi,
} = require("../controllers/positionController");

const router = express.Router();

router.post("/position", addPostion);
router.get("/positions", getAllPositions);
router.get("/hi", hi);

module.exports = {
  routes: router,
};
