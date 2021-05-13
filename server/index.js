require('dotenv').config({path: '../.env'})
const express = require('express')
const app = express();
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
const io=socket(server);

io.on('connection',()=>{
  console.log("socket is connected");
})