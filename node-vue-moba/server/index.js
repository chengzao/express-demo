const express = require("express")
const app = express()

// jwt auth
app.set('secret', 'i2u34y12oi3u4y8')

// cors解决跨域
app.use(require('cors')())
// 解析json
app.use(express.json())

// 上传资源
app.use('/uploads', express.static(__dirname + '/uploads'))

// 使用 mongo
require('./plugins/db')(app)
// admin api
require('./routes/admin')(app)
// web api
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
