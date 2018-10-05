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
