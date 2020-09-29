var name = prompt("Enter your name")
var socket = io.connect("http://localhost:9000");
var obj ={}


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
       var message = document.getElementById("message").value
       if(message!=null || message!="")
       {
       obj.message=message
       socket.emit("send-message",obj)
    }
}
}
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
obj=Object.assign({},data)
   document.querySelector(".uul1").innerHTML=""
   document.querySelector(".random").innerHTML="User Connected! Say Hi..."   
   document.getElementById("button").innerHTML="Send" 
   document.getElementById("button1").style.display="inline-block"
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
