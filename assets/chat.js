var name = prompt("Enter your name")
var socket = io.connect("http://localhost:9000");



document.getElementById("button").onclick=function()
{
    if(document.getElementById("button").innerHTML=="Start")
    {
        document.getElementById("button").innerHTML="Send"
        console.log("Hii")
           document.querySelector(".random").innerHTML="Connecting to a user...."
            socket.emit("new-user",{
                name:name
            })
         
    }
    else
    {

    }
}
socket.on("no-user",function(data){
    document.querySelector(".random").innerHTML="No user is online or free"
    
    document.getElementById("button").innerHTML="Start"
})
