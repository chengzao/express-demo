var express = require('express')
var app = express()
var cors = require('cors')
var router = require('./routes/index')
var bodyParser = require('body-parser')
var fs = require('fs')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.use(cors())
app.use('/other', router)


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send({
    path: 'Express Home'
  })
})

app.post('/form', urlencodedParser, function (req, res) {
  // 准备以JSON的格式输出
  console.dir(req.body);
  res.send(req.body);
})

// 处理form-data数据: multipart/form-data
app.post('/formdata', multipartMiddleware, function (req, res) {
  // 准备以JSON的格式输出
  console.log(req.body, req.files);
  res.send(req.body);
})


app.post('/upload', multipartMiddleware, function (req, res) {
  //接收前台POST过来的base64
  var imgData = req.body.file;
  // console.log(req.body);
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile(req.body.name, dataBuffer, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send(req.body);
    }
  });

  // res.send(req.body);
})


app.listen(8081, function () {
  var host = '127.0.0.1';
  console.log(`server app listening at http://${host}:8081`)
})
