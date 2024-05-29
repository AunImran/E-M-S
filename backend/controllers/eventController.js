const Event = require('../models/Event');
const Attendee = require('../models/Attendee');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register an attendee
const registerAttendee = async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    attendee.event = req.params.id;
    await attendee.save();
    const event = await Event.findById(req.params.id);
    event.attendees.push(attendee);
    await event.save();
    res.status(201).json(attendee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get attendees for an event
const getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees');
    res.status(200).json(event.attendees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  registerAttendee,
  getAttendees,
};
