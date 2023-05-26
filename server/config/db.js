const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Database connected..");
  } catch (err) {
    console.log("Database connection failed");
  }
};

module.exports = connectDatabase;
