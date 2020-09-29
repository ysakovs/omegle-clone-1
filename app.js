var express = require('express')
var socket = require('socket.io')

var app = express()
app.use(express.json({
    limit:'1mb'
}))
app.set('view engine','ejs')
app.use(express.static(__dirname+'/assets'));
app.use(express.static('public'))
app.get('/',function(req,res){
    res.render("index")
})
var server = app.listen(process.env.PORT||8000,function(){
    console.log("Listening at port 8000")
})
var io = socket(server)
var free=[]
var name=[]
io.on('connection',function(socket){
    socket.on("new-user",function(data){
        if(free.includes(socket.id))
        {

        }
        else
        {
        free.push(socket.id)
        name.push(data.name)
        }
        var count=0;
        var interval = setInterval(searching,1000)
        
        function searching()
        {
        
        if(free.length==0 || free.length==1)
        {
            /*
            free=[]
            name=[]
            */

            /*
            io.to(socket.id).emit("no-user",{
                message:"Sorry"
            })
            */

        }
        else
        {
            console.log("Before removing")
            console.log(free)
            console.log(name)
            clearInterval(interval)
            var index = free.indexOf(socket.id)
            var nn = name[index]   
            free.splice(index,1)
            name.splice(index,1)
            
            var random = Math.floor(Math.random()*free.length)
            var first = free[random]
            var first_name = name[random]
            free.splice(random,1)
            name.splice(random,1)
            console.log("After removing")
            console.log(free)
            console.log(name)
            io.to(first).to(socket.id).emit("user-connected",{
                first:first,
                second:socket.id,
                first_name:first_name,
                second_name:nn
            })    
        }
    }
    

    })

    socket.on("typing",function(data){
        if(socket.id==data.first)
        {
            io.to(data.second).emit("typed",data)
        }
        else
        {
          io.to(data.first).emit("typed",data)
        }
    })

    socket.on("send-message",function(data){
        
        if(socket.id==data.first)
        {
            var name = data.first_name
            data.identity=name
          io.to(socket.id).to(data.second).emit("message-sent",data)
        }
        else
        {
            var name = data.second_name
            data.identity=name
            io.to(socket.id).to(data.first).emit("message-sent",data)
        }
    })

    socket.on("disconnected",function(data){
       
       io.to(data.first).to(data.second).emit("user-dis",{
           message:"Sorry"
       })
    })

    })



