/**
 * express : POST
 */
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

// 创建目录的函数
var createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';

//调用目录创建函数 ==>目录创建完成
createFolder(uploadFolder);

// 创建一个storage对象
var storage = multer.diskStorage({
  // 设置存放位置
  destination: function(req, file, cb) {
      cb(null, uploadFolder);
  },
  // 设置文件名称
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});
// 使用storage
var upload = multer({ storage: storage });


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/form', function (req, res) {
   var form = fs.readFileSync(path.join(__dirname,'html/form.html'),{encoding:'utf8'});
   res.send(form);
})


app.post('/', urlencodedParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

app.post('/upload', jsonParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

app.post('/form2', upload.single('logo'), function(req, res) {
  console.dir(req.file);
  res.send({ 'ret_code': 200 });
});


var server = app.listen(8081, function () {
  var host = 'localhost'
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})