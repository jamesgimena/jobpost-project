const express = require("express");
const router = express.Router();

const {
  getApplicant,
  registerApplicant,
  loginApplicant
} = require("../controller/applicantController.js");

const validateToken = require("../middleware/validateToken.js");

router.post("/register",registerApplicant).post("/login",loginApplicant);

router.get("/dashboard",validateToken, getApplicant);

module.exports = router;
