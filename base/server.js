var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var axios = require("axios");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var app = express();

const port = 8080;

// 创建目录的函数
var createFolder = function(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";

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

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "miniprogram",
      resave: false,
      saveUninitialized: true
    })
  )

  .use((req, res, next) => {
    req.user = users[req.session.openId];
    console.log(`req.url: ${req.url}`);
    next();
  })

  .post("/upload", upload.single("video"), function(req, res) {
    console.dir(req.file);
    res.send({ ret_code: 200 });
  })

  .use(function(err, req, res, next) {
    console.log("err", err.message);
    res.send({
      code: 500,
      message: err.message
    });
  })

  .listen(port, err => {
    console.log(`listen on http://localhost:${port}`);
  });
