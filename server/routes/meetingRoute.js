const express = require("express");

const {
  getAllMeetings,
  createNewMeeting,
} = require("../controllers/meetingContoller");

const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/schedule",authMiddleware, createNewMeeting);
router.get("/all", authMiddleware, getAllMeetings);

module.exports = router;
