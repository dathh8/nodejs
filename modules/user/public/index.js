const socket = io.connect('http://127.0.0.1:3000');

socket.on('connect', function() {
    socket.emit('join', "hello server");
});