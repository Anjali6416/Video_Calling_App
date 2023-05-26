const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    topic: { type: String },
    meetingLink: { type: String, required: true },
    host: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    hostEmail: { type: String, required: true },
    participants: [{ type: String, required: true }],
    dateandtime: { type: Date, required: true },
    duration: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
