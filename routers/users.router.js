const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res) => {
  res.send("All users");
});

userRouter.post("/signup", async (req, res) => {
  let { email, password, confirm_password } = req.body;
  console.log(req.body);

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        let user = new UserModel({
          email,
          password: hash,
          confirm_password: hash,
        });
        await user.save();
        res.send({ mssg: "Signup successfull, please login to continue" });
      } else {
        res.send({ mssg: "Something went wrong", err: err.message });
      }
    });
  } catch (err) {
    res.send({ mssg: "Something went wrong", err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);

  try {
    let user = await UserModel.find({ email });
    console.log(user);

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ mssg: "Login successfull", token: token });
        } else {
          res.send({
            mssg: "Wrong credentials, please enter correct credentials",
            err: err,
          });
        }
      });
    } else {
      res.send({
        mssg: "Wrong credentials, please enter correct credentials",
      });
    }
  } catch (err) {
    res.send({ mssg: "Something went wrong", err: err.message });
  }
});

module.exports = {
  userRouter,
};
