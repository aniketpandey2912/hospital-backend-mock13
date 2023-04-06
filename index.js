require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("mongoose");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't connect to DB");
  }
  console.log("Serevr running at port", process.env.PORT);
});
