const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  registerAttendee,
  getAttendees,
} = require('../controllers/eventController');

router.post('/events', createEvent);
router.get('/events', getEvents);
router.post('/events/:id/register', registerAttendee);
router.get('/events/:id/attendees', getAttendees);

module.exports = router;
