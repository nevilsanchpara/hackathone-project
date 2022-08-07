const express = require("express");
const {getCommonData} = require("../controllers/commonController");

const router = express.Router();

router.get("/getcommondata", getCommonData);

module.exports = {
  routes: router,
};
