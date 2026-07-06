require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API Chat Distribuido funcionando'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

require('./sockets/chatSocket')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});