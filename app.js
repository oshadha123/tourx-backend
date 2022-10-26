require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();

const loginRouter = require("./api/login/login.router");
const userRegister = require("./api/register/register.router");
const forgotRouter = require("./api/forgotPassword/forgot.router");
const getLeaderBoard = require("./api/tourguide/tourguide.home.router")
const addTour = require("./api/tourguide/tourguide.tour.router")
const getYourTours = require('./api/tourguide/tourguide.home.router')
const touristRoutes = require('./api/tourist/tourist.router')
const adminRoutes = require('./api/admin/admin.router')
const profile = require('./api/profile/profile.router')
const payment = require('./api/payment/payment.router')
const report = require('./api/report/report.router')
const travel = require('./api/travel/travel.router')

app.use(cors())
app.use(express.json());

app.use("/api/v1", userRegister);
app.use("/api/v1", loginRouter);
app.use("/api/v1",getLeaderBoard);
app.use("/api/v1",getYourTours);
app.use("/api/v1",forgotRouter);
app.use("/api/v1", profile);
app.use("/api/v1", touristRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", payment);
app.use("/api/v1", report);
app.use("/api/v1", travel);
app.use("/api/v1", addTour);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});