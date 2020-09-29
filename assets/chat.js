var name = prompt("Enter your name")
var socket = io.connect("http://localhost:9000");

console.log(document.getElementById("button").innerHTML)

document.getElementById("button").onclick=function()
{
    if(document.getElementById("button").innerHTML=="Start")
    {
        socket.on('connect',function(){
            socket.emit("user",{
                name:"Rishav"
            })
         })
    }
    else
    [

    ]
}

