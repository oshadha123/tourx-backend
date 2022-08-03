require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/login/login.router");
//const userRegister = require("./api/register/register.router");

app.use(express.json());

app.use("/api/v1/login", userRouter);
//app.use("/api/v1/register", userRegister);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});