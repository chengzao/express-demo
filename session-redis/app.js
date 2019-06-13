/**
 * Created by tjm on 9/7/2017.
 */

var express = require("express");
var app = express();
var session = require("express-session");
var bodyparser = require("body-parser");
var mongoose = require('mongoose');

var User = require('./user')

mongoose.connect('mongodb://localhost/redis_session', {useNewUrlParser: true});

mongoose.connection.once('open',()=>{
  console.log('数据库连接成功')
})
mongoose.connection.once('close',()=>{
  console.log('数据库已断开连接')
})


// redis 模块
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
var RedisStore = require('connect-redis')(session);

app.use(express.static("public"));

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});

// 使用 session 中间件
app.use(
  session({
    secret: "secret", // 用来对session id相关的cookie进行签名
    resave: false, // 是否每次都重新保存会话，建议false
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    name: "redis",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    },
    store: new RedisStore() // (使用redis的存储session)
  })
);

// 检测 session是否正常
app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('session错误'))
    }else {
        console.log(req.session)//正常打印当前session
    }
    next() // 正常 载入下一个中间件
})

// 获取登录页面
app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/home", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
});
app.get("/user", function(req, res) {
  res.sendFile(__dirname + "/public/user.html");
});

app.get("/join", function(req, res) {
  res.sendFile(__dirname + "/public/join.html");
});

// 用户登录
app.post("/join", function(req, res) {
  console.log(req.body.username, req.body.pwd);

  var user = new User({
    userName: req.body.username,
    passWord: req.body.pwd
  })

  user.save((err, data) => {
    console.log('data', data);
    if(err){
      res.status(500).json({ error: err });
    }else{
      res.json({ code: 1, data: data });
    }
  });

});


// 用户登录
app.post("/login", function(req, res) {
  console.log(req.body.username, req.body.pwd);

  if (req.body.username == "admin" && req.body.pwd == "123") {
    req.session.userName = req.body.username; // 登录成功，设置 session
    // res.redirect("/");
    res.json({ ret_code: 0, ret_msg: "登录成功", uername: req.body.username });
  } else {
    res.json({ ret_code: 1, ret_msg: "账号或密码错误" }); // 若登录失败，重定向到登录页面
  }
});

// 获取主页
app.get("/msg", function(req, res) {

  client.keys('sess:*', function (err, reply) {
    console.log('hello', reply); // hello world
  });

  if (req.session.userName) {
    //判断session 状态，如果有效，则返回
    res.json({
      ret_code: 0,
      ret_msg: "登录成功",
      username: req.session.userName
    });
  } else {
    res.json({ ret_code: 2, ret_msg: "登录过期" });
  }
});

// 退出
app.get("/logout", function(req, res) {
  req.session.userName = null; // 删除session
  res.redirect("login");
});

app.listen(8000, function() {
  console.log("http://127.0.0.1:8000");
});
