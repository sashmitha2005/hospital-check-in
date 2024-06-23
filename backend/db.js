const mongoose = require('mongoose');
const express = require('express');
const connectionString = 'mongodb://127.0.0.1:27017/doctor';
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const EventSchema = new mongoose.Schema({
  name: String,
  specialist: String,
  time: String,
  hname: String,
  haddress: String,
  cnumber: String
});

const Event = mongoose.model('doctor-list', EventSchema);


app.post('/get_all_events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error getting events:', err);
    res.status(500).send('Error retrieving events');
  }
});


app.post('/add_data', async (req, res) => {
  try {
    const data = req.body;
    const newEvent = new Event(data);
    await newEvent.save();
    res.json({ message: 'Event created successfully', _id: newEvent._id });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).send('Error creating event');
  }
});


app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(400).send('Error deleting event');
  }
});


app.put('/update_doctor/:id', async (req, res) => {
  const { id } = req.params;
  const { name, specialist, time, hname, haddress, cnumber } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      name,
      specialist,
      time,
      hname,
      haddress,
      cnumber
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', updatedEvent });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).send('Error updating event');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
