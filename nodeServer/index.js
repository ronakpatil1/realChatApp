const { addListener } = require('nodemon');

//node server which will handle socket.io connections
const io = require('socket.io')(8000)//instance of http//listens incoming events
const users= {};
 
io.on('connection', socket =>{ //socket.io instance //listens socket connection ex. harry connected to server etc, rohan sent a msg etc(=> runs anarrow function)
    //for event when new user joins
    socket.on('new-user-joined', name =>     //particular connection handling// in this case a user joined//accepts an event like user-joined here
    {
        users[socket.id] = name;// if socket.on accepts an event like new user-joined then it will set/append the name into users
        socket.broadcast.emit('user-joined', name) // displays/announces to other users a new user has joined
    });
    //for event send message
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})//requests to all to receive message(socket.broadcast.emit will send the message to all the other clients except the newly created connection)
    });          

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    });   
}
)
