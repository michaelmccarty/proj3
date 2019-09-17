// make connection
const socket = io.connect('http://localhost:3001');

// query DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let sendButton = document.getElementById('send');
let output = document.getElementById('output');

// emit events
// chat event

// vanilla JS send to 'chat' channel
sendButton.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// vanilla JS receive from 'chat' channel
socket.on('chat', function(data) {
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>` 
})

// vanilla JS send to 'typing' channel
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// vanilla JS receive from 'typing' channel 
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('disconnect', function (data){
    console.log(data);
})