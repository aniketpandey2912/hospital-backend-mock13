require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routers/users.router");
const { appointmentRouter } = require("./routers/appointments.router");
const { authenticate } = require("./middlewares/auth.middleware");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/users", userRouter);
app.use("/appointments", authenticate, appointmentRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't connect to DB");
  }
  console.log("Serevr running at port", process.env.PORT);
});
