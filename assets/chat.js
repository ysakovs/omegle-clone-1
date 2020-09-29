var socket = io.connect("http://localhost:9000");

socket.on('connect',function(){
    console.log("User connected")
})
