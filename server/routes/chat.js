const express = require("express");
const chatcontollers = require("../controllers/chat-controller")

const router = express.Router();

router.route("/").post(chatcontollers.mail);

module.exports = router;