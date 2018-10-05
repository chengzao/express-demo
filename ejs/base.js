'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// 在express中，通过下面的固定语句来设置静态资源处理方式
app.use('/public', express.static('public'));

app.set('view engine','ejs');

/*app.get('/', writeLog, function(req, res, next) {
  console.log(2);
  next();
}, function(req, res) {
  res.end('3');
});*/

app.get('/login',[writeLog,function (req,res) {
  res.send('欢迎登录');
}]);


app.get('/',function(req,res){
  res.send('home')
})

// http://localhost:3000/form/abc
app.get('/form/:name', function(req, res) {
  // var person = req.params.name;
  // res.render('form', { person: person });
  var data = { age: 29, job: "programmer", hobbie: ['eating', 'fighting', 'fishing'] };
  res.render('form', { data: data });
});


app.get('/about', function(req, res) {
  res.render('about');
});


app.get('/download',(req,res)=>{
  // res.download('./log.txt'); // 提示客户端下载一个文件
  // res.redirect('/'); // 让客户端重定向，对 ajax  无效
  // res.sendFile(path.join(__dirname,'log.txt')); // 读取文件内容，发送到客户端
});

// 花式路由，可以以链式路由
app.route('/reg')
  .get((req,res)=>{
    res.render('reg',{
      title:'用户注册'
    });
  })
  .post((req,res)=>{
    res.send('处理用户注册');
  });

app.listen(3000, '127.0.0.1', () => {
  console.log('server is running at port 3000');
});



function writeLog(req,res,next) {
  fs.appendFile('./log.txt',req.url + (+new Date())+'\r\n',(err,data)=>{
    // 记录用户访问首页的日志
    if (err) {
      res.end(err.message);
    }
    next();
  });
}
