var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}))

// 对访问主页的响应
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

// 对向主页进行的POST请求的响应  -- chrome plugin : postman
app.post('/', function (req, res) {
  console.log("Got a POST request for the homepage");

  res.send('Hello POST');
})

//对向指定路径进行的DELETE请求的响应
app.delete('/del_user', function (req, res) {
  console.log("Got a DELETE request for /del_user");
  res.send('Hello DELETE');
})

//对向指定路径进行的GET请求的响应
app.get('/list_user', function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send('Page Listing');
})

//对abcd、abxcd和ab123cd进行的GET请求的响应
app.get('/ab*cd', function(req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match');
})

// http://localhost:8081/profile/1
app.get('/profile/:id',function(req,res){
  // console.log(req.params)
  res.status(200).send(req.params.id)
})

// http://localhost:8081/profile/1/usr/ca
app.get('/profile/:id/usr/:name',function(req,res){
  // console.log(req.params)
  let msg = 'id => '+ req.params.id+ ', name => ' +req.params.name;
  res.status(200).send(msg)
})

// http://localhost:8081/query?page=34
app.get('/query',function(req,res) {
  // console.log(req.query);
  res.send(req.query)
})

var server = app.listen(8081, function () {
  var host = 'localhost'
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
