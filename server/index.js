require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const authRouter = require('./routes/authRouter');
const meetingRouter = require('./routes/meetingRoute')

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to VideoCall app");
});
app.use("/auth", authRouter);
app.use("/meeting", meetingRouter);


app.listen(process.env.PORT_NUMBER, () => {
  try {
    connectDatabase();
    console.log(`Server is listening on port ${process.env.PORT_NUMBER}... `);
  } catch (error) {
    console.log(error);
  }
});

