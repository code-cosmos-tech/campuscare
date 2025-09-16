const express = require("express");
const appointController = require("../controllers/appoint-controller")

const router = express.Router();

router.route("/getAll").get(appointController.getAppointments);

router.route("/:id").get(appointController.getAppointmentById);

router.route("/delete/:id").delete(appointController.deleteAppointment);

router.route("/").get((req, res) => {
    res.send("This is appointemnt route");
}).post(appointController.createAppointment);


module.exports = router;