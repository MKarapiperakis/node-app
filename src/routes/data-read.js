const express = require("express");

//controllers
const userController = require("../controllers/user");
const loginController = require("../controllers/login");
const dialogFlowController = require("../controllers/dialogFlow");

const router = express.Router();
const isAuth = require("../middlewares/is-auth");

router.get("/users", userController.getUsers);

router.post("/login", loginController.login);

router.get("/user/:id", isAuth, userController.getUser);

router.post("/dialogFlow",dialogFlowController.getBotResponse);

module.exports = router;
