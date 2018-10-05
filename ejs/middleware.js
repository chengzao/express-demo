var express = require('express');

var app = express();


app.use('/assets', express.static('public'));

app.use(function(req,res,next){
    console.log("first middleware start")
    next();
    console.log("first middleware end")
})

app.use('/home',function(req,res,next){
    console.log('second middleware')
    res.send('ok');
    next()
})

app.get('/ai',function(req,res){
    console.log('home')
    res.send("this is end");
})

app.listen(3000,'localhost');