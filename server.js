const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const rooms = new Map();

app.get('/', (req, res) => {
  res.json({ 
    status: '✅ BlockCall Backend Running',
    rooms: rooms.size,
    message: 'Backend is working!'
  });
});

app.post('/api/create-room', (req, res) => {
  const roomId = Math.random().toString(36).substring(2, 10).toUpperCase();
  rooms.set(roomId, { 
    host: req.body.walletAddress || 'anonymous',
    created: Date.now() 
  });
  
  res.json({ 
    success: true, 
    roomId,
    token: 'demo-token-' + roomId,
    livekitUrl: 'wss://demo.livekit.cloud'
  });
});

app.post('/api/join-room', (req, res) => {
  const room = rooms.get(req.body.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  res.json({ 
    success: true,
    token: 'demo-token-' + req.body.roomId,
    livekitUrl: 'wss://demo.livekit.cloud'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Backend running on port', PORT);
});
