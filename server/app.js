const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const hpp = require('hpp')
const router = require('./routes/index')
const db = require('./models')

dotenv.config()
const app = express()
const port =  process.env.PORT || 80

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(hpp())
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
      credentials: true
    })
  )
} else {
  app.use(morgan('dev'))
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
      credentials: true
    })
  )
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 6 * 60 * 10000,
  },
  name: 'session-cookie'
}
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true
  sessionOption.cookie.secure = true
}
app.use(session(sessionOption))

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공')
  })
  .catch(console.error)

app.use('/', router)

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동 중 입니다.`)
})
