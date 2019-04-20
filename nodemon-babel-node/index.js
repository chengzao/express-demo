import express from 'express'

const app = new express()

// 对访问主页的响应
app.get('/', function (req, res) {
  res.send('nodemon babel-node !!!');
})

app.listen(9090, () => {
  console.log('server start http://localhost:9090')
})
