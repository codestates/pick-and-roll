const dotenv = require('dotenv')
dotenv.config()

const CLIENTDOMAIN = process.env.REACT_APP_CLIENT_DOMAIN || 'http://localhost:3000'
const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID
const REDIRECT_URI = `${CLIENTDOMAIN}/oauth/kakao`

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`