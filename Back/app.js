const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConfig } = require("./config");
const {
  paidsRouter,
  roleRouter,
  classRouter,
  userRouter,
  loginRouter,
  registerRouter,
  activityRouter,
  enrollRouter,
  hoursRouter,
  daysRouter,
  wodRouter

} = require("./routes");
const corsConfig = require("./config/cors");
const passport = require('passport')


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors(corsConfig));
app.use(passport.initialize())

require("./services/ResetService");

app.use("/api/role", roleRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/activity", activityRouter);
app.use("/api/enrollments", enrollRouter);
app.use("/api/hours", hoursRouter);
app.use("/api/days", daysRouter);
app.use("/api/class", classRouter);
app.use("/api/payment", paidsRouter);
app.use("/api/wods", wodRouter);


app.listen(PORT, async () => {
  await dbConfig.initDB();
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
