'use strict';

const express = require('express');
const router = express.Router(); // 创建一个路由容器


router.get('/',(req,res)=>{
  res.send('other');
});

module.exports = router;
