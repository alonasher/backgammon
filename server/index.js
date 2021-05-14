require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const userController = require('./controllers/user');

app.use(bodyParser.json());

const port = process.env.SERVER_PORT;

app.use(userController);

const server= app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// Chatroom
const io = socket(server, {
  cors: {
    origin: '*',
  }})

io.on('connection', (socket => {
  console.log(`new connection ${socket.id}`);

  socket.on('emitNumber', (data) => {
      console.log(data);
      io.emit('recievedNumber', data)
  })

  socket.on('emitRandom', () => {
      console.log("in random");
      io.emit('randomNumber', Math.random())
  })

  socket.on('chat',(data)=>{
      io.sockets.emit('chat',data);
  })

  socket.on('typing',(data)=>{
    io.sockets.emit('typing',data)
  })

  socket.on('connect',(data)=>{
    io.sockets.emit('connectedUsers',data)
  })
  
}))