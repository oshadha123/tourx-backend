require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();

const userRouter = require("./api/login/login.router");
const userRegister = require("./api/register/register.router");
const loginRouter = require("./api/login/login.router");
const getLeaderBoard = require("./api/tourguide/tourguide.home.router")
const getYourTours = require('./api/tourguide/tourguide.home.router')

app.use(cors())
app.use(express.json());

app.use("/api/v1/login", userRouter);
app.use("/api/v1/register", userRegister);
// app.use("/api/v1", loginRouter);
// app.use("/api/v1",getLeaderBoard);
// app.use("/api/v1",getYourTours)
//app.use("/api/v1/register", userRegister);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});