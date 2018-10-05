###nodejs  express
- Web应用框架：核心功能
      - 允许安装中间件来响应http请求
      - 定义了一个路由表，用于实现基于http方法和url的复杂操作。
      - 允许以向模板发送参数的方式来动态地渲染HTML页面
- npm install express --save 
- npm install express -g
- npm install body-parser --save：用于控制JSON、Raw、Text和URL的中间件 
- npm install cookie-parser --save：用于获取cookie头并把
  以cookie的名字作为关键字的对象添加到req.cookies中的中间件
- npm install multer --save：用于控制表单数据的中间件

## Express 

web 开发框架

### 安装

```
npm install express --save
```

### Express的开发固定模式

```JavaScript
'use strict';
const express = require('express');

const app = express();

// 中间写一些配置的东西，还有路由处理函数

app.listen(3000,'127.0.0.1',()=>{
  console.log('server is running');
});
```

### Express托管静态文件

```
app.use(express.static('public'));
```

只要在项目中做了上述的操作：public 目录下所有的静态资源对可以访问了：
```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```


可以给静态资源托管，添加一个虚拟路径，所有静态资源的请求都需要以 该 **虚拟路径**开头
参数中的虚拟路径必须以 **/** 开头
```
app.use('/static', express.static('public'));
```




### Express中简单的路由处理方式

- 处理get请求的url

```
app.get('/路径',(req,res)=>{
  // 请求处理函数
});
```

- 处理post请求的url

```
app.post('/路径',(req,res)=>{
  // 请求处理函数
});
```

### res响应方法

### 在Express中使用路由模块化

1.新建一个 router.js 文件，在里面写入如下代码：

直接通过给 router 设置请求处理函数即可，最后要向外把 router 暴露出去

```
'use strict';

const express = require('express');
const router = express.Router(); // 创建一个路由容器

router.get('/',(req,res)=>{
  res.send('首页');
});

router.get('/login',(req,res)=>{
  res.send('用户登录');
});

module.exports = router;

```

2.在app.js 文件中

```
const router = require('./router'); // router.js一定要放在项目的根路径下
app.use(router); // 表示把用户的请求分发到了路由容器中了，它里面就做了路径匹配判断了
```
