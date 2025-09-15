const express = require("express");
const userRouter = express.Router();
const authFunction = require("../middlewares/auth-func");
const usercontrollers = require("../controllers/user-controller");

userRouter.route("/").get(authFunction, usercontrollers.getUser);

module.exports = userRouter;