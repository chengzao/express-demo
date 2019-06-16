const express = require('express')

const app = express()

const PORT = 3001
const jwt = require('jsonwebtoken')
const SECRET = 'mongoose-auth'

const { User } =  require('./model/db')

app.use(express.json())


const auth = async (req, res, next) => {
  // 获取token源
  const raw = String(req.headers.authorization).split(' ').pop()
  // 解密token

  try {
    const tokenData = jwt.verify(raw, SECRET)
    req.user = await User.findById(tokenData.id)
  } catch (error) {
    req.user = null
  }
  next()
}


app.get('/', async (req, res) => {
  res.send('Home')
})

// 查询所有的用户
app.get('/api/users', async (req,res) => {
  const users = await User.find()
  res.send(users)
})

app.get('/api/profile', auth ,async (req, res) => {
  if(!req.user){
   return res.status(422).send({
      message: 'auth无效'
    })
  }
  res.status(200).send({
    username: req.user.username
  })
})

// 注册
app.post('/api/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send(user)
})

// 登录
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })
  // 校验用户名
  if(!user){
    return res.status(422).send({
      message:"用户名不存在"
    })
  }

  // 校验密码
  const isPasswordValid = require('bcrypt').compareSync(
    req.body.password,
    user.password
  )
  if(!isPasswordValid){
    return res.status(422).send({
      message: '密码无效'
    })
  }

  // 生成token


  const token = jwt.sign({
    id: String(user._id)
  }, SECRET)

  res.send({
    user: user.username,
    'token': token
  })
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})
