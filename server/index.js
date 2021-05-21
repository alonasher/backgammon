require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const userController = require('./controllers/user');

app.use(cors());
app.use(bodyParser.json());

const port = process.env.SERVER_PORT ||3000;

app.use(userController);

const server= app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// Chatroom
const io = socket(server, {
  cors: {
    origin: '*',
  }})

let connectedUsersList=[];
io.on('connection', (socket => {
  connectedUsersList.push({'token':socket.id})
  io.sockets.emit('connected',connectedUsersList)

  // socket.on('emitNumber', (data) => {
  //     console.log(data);
  //     io.emit('recievedNumber', data)
  // })

  // socket.on('emitRandom', () => {
  //     console.log("in random");
  //     io.emit('randomNumber', Math.random())
  // })

  socket.on('chat',(data)=>{
      io.sockets.emit('chat',data);
  })

  socket.on('typing',(data)=>{
    io.sockets.emit('typing',data)
  })

  socket.on('connect',(data)=>{
    io.sockets.emit('connectedUsers',data)
  })

  socket.on('private message',(data)=>{
    console.log(data);
    io.to(data.to.token).emit('chat', data);
  });

  socket.on('disconnect',()=>{
    try{
      console.log("Before",connectedUsersList);
      removeItem(connectedUsersList,socket.id);
      console.log("After",connectedUsersList);
      io.sockets.emit('connected',connectedUsersList)

    }catch(err){
      console.error("Error occurd!" , err);
    }
  })

  socket.on('game play',(data)=>{
    io.to(data.to.token).emit('gameplay',data)
  })
}))

function removeItem(arr, value) {
  var index = arr.findIndex((x)=>x.token == value)
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
