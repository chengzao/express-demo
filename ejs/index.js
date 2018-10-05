'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = require('./routers/router');
const otherRouter = require('./routers/other');

const app = express();

// 在express中，通过下面的固定语句来设置静态资源处理方式
app.use('/public', express.static('public'));
// url: http://localhost:3000/public/img/08.jpg

// 配置路由处理，加入路由容器
app.use(router);

app.use('/other',otherRouter);

app.listen(3000, '127.0.0.1', () => {
  console.log('server is running at port 3000');
});
