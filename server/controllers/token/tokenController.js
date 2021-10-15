const dotenv = require('dotenv')
const { sign, verify } = require('jsonwebtoken')
dotenv.config()

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '30s' })
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' })
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      path: '/'
    })
  },
  sendAccessToken: (res, accessToken, userData) => {
    res.json({accessToken, userData})
  },
  resendAccessToken: (res, accessToken, userData) => {
    res.send({accessToken, userData} )
  },
  isAuthorized: (req) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
      return null
    } else if (authorization) {
      const token = authorization.split(' ')[1]
      try {
        return verify(token, process.env.ACCESS_SECRET)
      } catch (err) {
        // return null if invalid token
        return null
      }
    }
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET)
    } catch (err) {
      // return null if refresh token is not valid
      return null
    }
  }
}
