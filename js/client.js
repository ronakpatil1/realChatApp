const socket = io('http://localhost:8000');

const form = document.getElementById('send-container') //The getElementById() method returns an element with a specified value.
const messageInput = document.getElementById('msgInp')
const messageContainer = document.querySelector('.container')//all messages will occur in this container//The querySelector() method returns the first element that matches a CSS selector.To return all matches (not only the first), use the querySelectorAll() instead.Both querySelector() and querySelectorAll() throw a SYNTAX_ERR exception if the selector(s) is invalid

var audio1 = new Audio('bloop.mp3');//audio1 will have the music registered

const append =(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left'){
    audio1.play();}
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

const newName = prompt("Enter your name to join"); //The prompt() method displays a dialog box that prompts the user for input.
socket.emit('new-user-joined', newName);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`,'left')
})


