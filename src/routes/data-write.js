const express = require("express");
const userController = require("../controllers/user");
const emailController = require("../controllers/email");
const router = express.Router();

router.post("/users", userController.createUser);

router.post("/email", emailController.sendEmail)

module.exports = router;
