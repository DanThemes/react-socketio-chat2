const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});


io.on('connection', socket => {
    console.log(socket.id);

    socket.on('join_room', room => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`)
    })

    socket.on('send_message', data => {
      // console.log(data);
      socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected.`)
    })
})












app.get('/', (req, res) => {
    res.send('Hi');
})

server.listen(3001, () => {
    console.log('Server is running.')
})
