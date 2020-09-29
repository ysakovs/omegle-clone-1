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

socket.on("user-connected",function(data){
   document.querySelector(".random").innerHTML="User Connected! Say Hi..."   
   document.getElementById("button").innerHTML="Send" 
   document.querySelector(".message-box").innerHTML+="<button type='button' class='btn btn-success' id='button1'>Leave</button>"
})

document.getElementById("button1").onclick=function()
{
    
}



socket.on("no-user",function(data){
    document.querySelector(".random").innerHTML="No user is online or free"
    
    document.getElementById("button").innerHTML="Start"
})
