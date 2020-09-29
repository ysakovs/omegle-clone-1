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
var server = app.listen(process.env.PORT||9000,function(){
    console.log("Listening at port 9000")
})
var io = socket(server)
io.on('connection',function(socket){
    socket.on("user",function(data){
        console.log("User connected"+data.name)
    })

    })



