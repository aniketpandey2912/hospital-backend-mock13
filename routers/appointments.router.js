const express = require("express");
const appointmentRouter = express.Router();
const { AppointmentModel } = require("../models/Appointment.model");

appointmentRouter.get("/", async (req, res) => {
  try {
    let appointments = await AppointmentModel.find();
    res.send({ mssg: "All appointments", appointments: appointments });
  } catch (err) {
    res.send({ mssg: "Something went wrong", err: err.message });
  }
});

appointmentRouter.post("/create", async (req, res) => {
  let payload = req.body;
  //   console.log(payload);
  try {
    let appointment = new AppointmentModel(payload);
    await appointment.save();
    res.send({ mssg: "Appointment created" });
  } catch (err) {
    res.send({ mssg: "Appointment creation failed", err: err.message });
  }
});

appointmentRouter.patch("/book/:id", async (req, res) => {
  let ID = req.params.id;
  try {
    let appointment = new AppointmentModel.findById({ _id: ID });
    console.log(appointment);
    let updated = { ...appointment, slots: appointment.slots - 1 };
    await appointment.save();
    res.send({ mssg: "Appointment created" });
  } catch (err) {
    res.send({ mssg: "Appointment creation failed", err: err.message });
  }
});

module.exports = {
  appointmentRouter,
};
