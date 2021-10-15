const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken
} = require('../token/tokenController')
const { User } = require('../../models')

module.exports = {
  generateRandomPassword: () => {
    const chars =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*"
    const stringLength = 8

    let randomString = ''
    for(let n=0; n < stringLength; n++) {
      let randomNum = Math.floor(Math.random() * chars.length)
      randomString += chars.substring(randomNum, randomNum + 1)
    }
    return randomString
  },
  everyScoreSum: (arr) => {
    let sum = 0
    arr.map((el) => (sum += el.dataValues.score))
    return sum
  },
  everyScoreSum: (arr) => {
    let sum = 0
    arr.map((el) => (sum += el.dataValues.score))
    return sum
  },
  isAuth: async (req, res, next) => {
    const accessTokenData = isAuthorized(req)
    const refreshToken = req.cookies.jwt
    if (!accessTokenData) {
      if (!refreshToken) {
        return res.status(403).send({ message: '로그인이 필요한 권한입니다.' })
      }
      const refreshTokenData = checkRefeshToken(refreshToken)
      if (!refreshTokenData) {
        return res.status(401).send({
          data: null,
          message: '권한이 확인되지 않습니다. 다시 로그인해주세요'
        })
      }
      const { email } = refreshTokenData
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              data: null,
              message: 'refresh token has been tempered'
            })
          }
          delete user.dataValues.password
          const newAccessToken = generateAccessToken(user.dataValues)
          res.locals.isAuth = newAccessToken
          res.locals.userId = user.dataValues.id
          res.locals.message = 'newAccessToken'
          next()
        })
        .catch((err) => {
          console.log(`New Access Token Error: ${err.message}`)
        })
    } else {
    const { email } = accessTokenData
    User.findOne({
      where: { email }
    })
      .then((user) => {
      if (!!user) {
        res.locals.userId = user.dataValues.id
        res.locals.message = 'Auth Ok!'
        next()
      }
    })
    .catch((err) => {
      console.log(`Access Token Error: ${err.message}`)
    })
   }
  }
}
