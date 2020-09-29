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

var io = socket(server)
io.on('connection',function(socket){
    console.log('made connection'+socket.id)
     socket.on('chat',function(data){
         io.sockets.emit('chat',data);
     })

    })












app.listen(process.env.PORT||9000,function(){
    console.log("Listening at port 9000")
})

