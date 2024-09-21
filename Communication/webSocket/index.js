const express = require('express');
const {createServer} = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req,res) => {
    res.sendFile(join(__dirname,'/index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('recieved message: ', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected')
    });
});
const port = process.env.PORT || 5011;
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});