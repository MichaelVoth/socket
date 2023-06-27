const express = require('express');
const app = express();
const cors = require('cors'); // cors allows us to connect to our react app
const socket = require('socket.io'); // socket.io allows us to use sockets
const port = 8000;

app.use(cors()); // allows us to connect to our react app


const server = app.listen(port, () => console.log(`Listening on port: ${port}`)); // listen to port 8000

const io = socket(server, { // socket.io is listening to the server
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});




io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    console.log(`Nice to meet you,(shake hand)`);
    socket.emit("Welcome", "Welcome to the server");

    socket.on("new_user", name => {
        // When a new user joins, broadcast a message to all other clients
        console.log(name);
        socket.broadcast.emit("new_message", { isNewUser: true, text: `${name} has joined the chat` });
    });


    socket.on("new_message", message => {
        // When a new message is received, send it to all clients
        console.log(message);
        io.emit("new_message", { ...message, isNewUser: false });
    });
    

});
