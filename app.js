const express = require('express');
const app= express();
const socketio = require('socket.io')
const http = require('http');
const path = require('path');
 
const server = http.createServer(app);

const io = socketio(server);

io.on("connection" , function(socket){
    socket.on("send-location" , (data) => {
        io.emit("receive-location" , {id:socket.id , ...data});
    });
    //console.log("connected");  

    socket.on('disconnect' , function() {
        io.emit("user-disconnected" , socket.id);
    });
});

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , function(req,res){
    res.render("index");
});

server.listen(3000, function() {
    console.log("Server is running on http://localhost:3000");
});