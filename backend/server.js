const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let trackingData = {
  location: null,
  calls: [],
  sms: []
};

// Endpoint to receive location data
app.post('/api/location', (req, res) => {
  const { latitude, longitude, timestamp } = req.body;
  trackingData.location = { latitude, longitude, timestamp };
  res.json({ status: 'Location data received' });
});

// Endpoint to receive call data
app.post('/api/call', (req, res) => {
  const { type, number, timestamp } = req.body;
  trackingData.calls.push({ type, number, timestamp });
  res.json({ status: 'Call data received' });
});

// Endpoint to receive SMS data
app.post('/api/sms', (req, res) => {
  const { sender, message, timestamp } = req.body;
  trackingData.sms.push({ sender, message, timestamp });
  res.json({ status: 'SMS data received' });
});

// Endpoint to get all tracking data
app.get('/api/tracking-data', (req, res) => {
  res.json(trackingData);
});

app.listen(port, () => {
  console.log(`Backend API server running at http://localhost:${port}`);
});
