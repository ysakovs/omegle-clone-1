var name = prompt("Enter your name")
var socket = io.connect("http://localhost:9000");



document.getElementById("button").onclick=function()
{
    if(document.getElementById("button").innerHTML=="Start")
    {        
           document.querySelector(".random").innerHTML="Connecting to a user...."
            socket.emit("new-user",{
                name:name
            })
         
    }
    else
    {

    }
}
var obj ={}
socket.on("user-connected",function(data){
obj=Object.assign({},data)
   document.querySelector(".random").innerHTML="User Connected! Say Hi..."   
   document.getElementById("button").innerHTML="Send" 
   document.getElementById("button1").style.display="inline-block"
})

document.getElementById("button1").onclick=function()
{
socket.emit("disconnected",obj)
}

socket.on("user-dis",function(data){
    document.getElementById("button1").style.display="none";
    document.querySelector(".random").innerHTML="User disconnected"
    document.getElementById("button").innerHTML="Start"
})

socket.on("no-user",function(data){
    document.querySelector(".random").innerHTML="No user is online or free"
    
    document.getElementById("button").innerHTML="Start"
})
