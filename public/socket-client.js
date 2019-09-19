// make connection
const socket = io.connect('http://localhost:3001');
console.log(socket)
// query DOM

let message = document.getElementById('messageInput');
let handle = document.getElementById('handle');
let sendButton = document.getElementById('sendBtn');

// emit events
// chat event

// vanilla JS send to 'chat' channel
sendButton.addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('chat', {
        message: message.value,
        handle: socket.id
    })
})

// vanilla JS receive from 'chat' channel
socket.on('chat', function(data) {
    output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>` 
})

// vanilla JS send to 'typing' channel
// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// })

// vanilla JS receive from 'typing' channel 
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('disconnect', function (data){
    console.log(data);
})