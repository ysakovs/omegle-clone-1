var name = prompt("Enter your name")
var socket = io.connect("http://localhost:8000");
var obj ={}

var interval
document.getElementById("button").onclick=function()
{
    if(document.getElementById("button").innerHTML=="Start")
    {
        document.querySelector(".random").innerHTML="Connecting to a user...."
       
        interval=setInterval(timer,1000)

           function timer()
           {
            socket.emit("new-user",{
                name:name
            })
        }

    }
    else
    {
       var message = document.getElementById("message").value
       if(message!=null || message!="")
       {
       obj.message=message
       socket.emit("send-message",obj)
    }
}
}


document.getElementById("next").onclick=function()
{
    clearInterval(interval)
    socket.emit("next",{
        message:"Please next Chat"
    })
}

socket.on("next-success",function(data){
    document.querySelector(".random").innerHTML="Click on Start button to start chat"
    document.getElementById("button").innerHTML=="Start"
})




window.setInterval(function() {
    var elem = document.getElementById("chatt");
    elem.scrollTop = elem.scrollHeight;
  }, 1000);

socket.on("message-sent",function(data){
    var html1="<li><strong>"+data.identity+"</strong><br>"+data.message+"</li>"
    document.querySelector(".uul1").innerHTML+=html1;
    document.getElementById("message").value=""
})


socket.on("user-connected",function(data){
    clearInterval(interval)
    console.log(data)
obj=Object.assign({},data)
   document.querySelector(".uul1").innerHTML=""
   document.querySelector(".random").innerHTML="User Connected! Say Hi..."   
   document.getElementById("button").innerHTML="Send" 
   document.getElementById("button1").style.display="inline-block"
})
var timer = null;
document.getElementById("message").onkeyup=function()
{
    clearTimeout(timer); 
       timer = setTimeout(doStuff, 2000)
    socket.emit("typing",obj)
}
function doStuff()
{
    socket.emit("stopped_typing",obj)
}

socket.on("stopped_typed",function(data){
    document.querySelector(".random").innerHTML="Other person is not typing"
})

socket.on("typed",function(data){
    document.querySelector(".random").innerHTML="Other person is typing....."   
})

document.getElementById("message").onkeydown=function(e)
{
    if(e.keyCode==13)
    {
        var message = document.getElementById("message").value
        if(message!=null || message!="")
        {
        obj.message=message
        socket.emit("send-message",obj)
     }
       
    }
}






document.getElementById("button1").onclick=function()
{
socket.emit("disconnected",obj)
}

socket.on("user-dis",function(data){
    document.getElementById("button1").style.display="none";
    document.getElementById("message").value=""
    document.querySelector(".uul1").innerHTML=""
    document.querySelector(".random").innerHTML="User disconnected"
    document.getElementById("button").innerHTML="Start"
})

socket.on("no-user",function(data){
    document.querySelector(".random").innerHTML="No user is online or free"
    
    document.getElementById("button").innerHTML="Start"
})
