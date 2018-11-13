/**
 * Created by tjm on 9/7/2017.
 */

var express = require("express");
var app = express();
var session = require("express-session");
var bodyparser = require("body-parser");

app.use(express.static("public"));

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));

// 使用 session 中间件
app.use(
  session({
    secret: "secret", // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    name: "username",
    cookie: {
      maxAge: 1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    }
  })
);

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
