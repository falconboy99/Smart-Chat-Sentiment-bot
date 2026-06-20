const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
const port = Number(process.env.PORT) || 3001;

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    aiResponse: { type: String, required: true },
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], required: true },
  },
  { timestamps: true }
);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

function analyzeSentiment(text) {
  const lower = String(text || '').toLowerCase();
  const positiveWords = ['good', 'great', 'awesome', 'love', 'happy', 'excellent'];
  const negativeWords = ['bad', 'sad', 'angry', 'hate', 'terrible', 'awful'];

  const positiveHits = positiveWords.filter((word) => lower.includes(word)).length;
  const negativeHits = negativeWords.filter((word) => lower.includes(word)).length;

  if (positiveHits > negativeHits) return 'positive';
  if (negativeHits > positiveHits) return 'negative';
  return 'neutral';
}

async function getAIResponse(text) {
  const input = String(text || '').trim();
  if (!input) {
    return 'Please send a non-empty message.';
  }

  return `You said: ${input}`;
}

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/chatapp';
mongoose.connect(mongoUri).catch((err) => console.error('MongoDB connection error:', err));

// REST endpoints
app.post('/chat', async (req, res) => {
  try {
    const { text } = req.body || {};
    const aiResponse = await getAIResponse(text);
    const sentiment = analyzeSentiment(aiResponse);

    await Message.create({ text: String(text || ''), aiResponse, sentiment });

    io.emit('newMessage', { text, aiResponse, sentiment });
    res.json({ aiResponse, sentiment });
  } catch (error) {
    console.error('Chat handler error:', error);
    res.status(500).json({ error: 'Unable to process chat request' });
  }
});

app.use(express.static(path.join(__dirname, 'chatapp', 'build')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'chatapp', 'build', 'index.html'));
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Client connected');
});

server.listen(port, () => console.log(`Server running on ${port}`));