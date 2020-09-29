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
var free=[]
var name=[]

io.on('connection',function(socket){
    socket.on("new-user",function(data){
       
        free.push(socket.id)
        name.push(data.name)
        if(free.length==0 || (free.length==1 && free[0]==socket.id))
        {
            free=[]
            name=[]
            io.to(socket.id).emit("no-user",{
                message:"Sorry"
            })
        }
        else
        {
            var random = Math.floor(Math.random(free.length))
            
        }

    })

    })



