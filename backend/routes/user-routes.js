const express = require("express");
const {
  add,
  getAllPositions,
  hi,
  addUser,
  login,
} = require("../controllers/userController");

const router = express.Router();

router.post("/adduser", addUser);
router.post("/login", login);
router.get("/hi", hi);
// router.get("/user", getAllPositions);

module.exports = {
  routes: router,
};
