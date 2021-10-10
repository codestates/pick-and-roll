const { User } = require('../models')
const { Recipe } = require('../models')
const { TasteScore } = require('../models')
const { EasyScore } = require('../models')
const { Favorite } = require('../models')
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  resendAccessToken,
  sendRefreshToken,
  isAuthorized,
  checkRefeshToken
} = require('../controllers/token/tokenController')
const { everyScoreSum } = require('../controllers/function/function')

module.exports = {
  signUp: (req, res, next) => {
    const { email, nickname, password, description } = req.body
    if (!email || !nickname || !password || !description) {
      res
        .status(422)
        .send({ message: '회원가입에 필요한 정보를 모두 입력하세요!' })
    }
    User.findOrCreate({
      where: {
        email: email,
        nickname: nickname,
        password: password,
        description: description
      }
    })
      .then(([data, created]) => {
        if (!created) {
          res
            .status(409)
            .send({ data: null, message: '동일한 이메일이 존재합니다!' })
        }
        res
          .status(201)
          .send({ message: '회원가입이 성공적으로 이루어졌습니다!' })
      })
      .catch((err) => {
        console.log('signUp accessToken error!')
        next(err)
      })
  },
  mailCheck: (req, res, next) => {
    User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          return res.send({ message: '✔ 사용 가능한 이메일입니다!' })
        }
        res.send({ message: '동일한 이메일이 존재합니다!' })
      })
      .catch((err) => {
        console.log('메일 유효성 검사 오류')
        next(err)
      })
  },
  nickCheck: (req, res, next) => {
    User.findOne({
      where: { nickname: req.body.nickname }
    })
      .then((user) => {
        if (!user) {
          return res.send({ message: '✔ 사용 가능한 닉네임입니다!' })
        }
        res.send({ message: '동일한 닉네임이 존재합니다!' })
      })
      .catch((err) => {
        console.log('닉네임 유효성 검사 오류')
        next(err)
      })
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password)
    User.findOne({
      where: { email, password }
    })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ data: null, message: '사용자를 찾을 수 없습니다!' })
        }
        let userData = user.dataValues
        delete userData.password
        const accessToken = generateAccessToken(userData)
        const refreshToken = generateRefreshToken(userData)
        sendRefreshToken(res, refreshToken) //access보다 위에 있어야 한다
        sendAccessToken(res, accessToken, userData)
      })
      .catch((err) => {
        console.log('SignIn Error!')
        next(err)
      })
  },
  logOut: (req, res, next) => {
    try {
      res.cookie('jwt', '', { maxAge: 0 })
      res.status(205).send({ message: 'Logged out successfully' })
    } catch (err) {
      console.log('logout error!')
      next(err)
    }
  },
  isAuth: async (req, res, next) => {
    const accessTokenData = isAuthorized(req)
    const refreshToken = req.cookies.jwt
    if (!accessTokenData) {
      if (!refreshToken) {
        res.status(403).send({
          message: '로그인이 필요한 권한입니다.'
        })
      }
      const refreshTokenData = checkRefeshToken(refreshToken)
      if (!refreshTokenData) {
        res.json({
          data: null,
          message: '권한이 확인되지 않습니다. 다시 로그인해주세요.'
        })
      }
      const { email } = refreshTokenData
      let findUser = await User.findOne({ where: { email } })
      if (!findUser) {
        res.json({
          data: null,
          message: 'refresh token has been tempered'
        })
      }
      delete findUser.dataValues.password

      const newAccessToken = generateAccessToken(findUser.dataValues)
      resendAccessToken(res, newAccessToken, findUser.dataValues)
    }
    const { email } = accessTokenData
    User.findOne({
      where: { email }
    })
      .then((user) => {
        let userData = user.dataValues
        delete userData.password
        res.send({ userData })
      })
      .catch((err) => {
        console.log('isAuth error!')
        next(err)
      })
  },
  update: async (req, res, next) => {
    let userId = res.locals.userId
    //사용자의 가입시 입력한 email은 수정 할 수 없습니다!
    userParams = {
      nickname: req.body.nickname,
      description: req.body.description
    }

    User.update(userParams, {
      where: { id: userId }
    })
      .then(async () => {
        let updatedData = await User.findOne({ where: { id: userId } })
        let userData = updatedData.dataValues
        delete userData.password
        res.send({ userData })
      })
      .catch((err) => {
        console.log('mypage update error!')
        next(err)
      })
  },
  passwordCheck: async (req, res, next) => {
    try {
      let userId = res.locals.userId
      delete res.locals.isAuth
      let findData = await User.findOne({ where: { id: userId } })
      let userData = findData.dataValues

      if (userData.password !== req.body.password) {
        res.status(404).send({ message: '비밀번호가 일치하지 않습니다' })
      } else if (userData.password === req.body.password) {
        res.send({ message: '비밀번호가 일치합니다' })
      }
    } catch (err) {
      console.log('비밀번호 확인 오류')
      next(err)
    }
  },
  passwordChange: async (req, res, next) => {
    try {
      let changePasswordData = req.body.password
      let userId = res.locals.userId
      delete res.locals.isAuth
      let userData = await User.findOne({ where: { id: userId } })
      console.log(userData)
      if (changePasswordData === userData.dataValues.password) {
        return res.send({
          message: '이전 비밀번호와 동일합니다. 다른 비밀번호로 변경해주세요.'
        })
      }
      await User.update(
        { password: changePasswordData },
        { where: { id: userId } }
      )
      res.send({ message: '비밀번호 변경이 완료됐습니다' })
    } catch (err) {
      console.log('비밀번호 변경 오류')
      next(err)
    }
  },
  myRecipe: async (req, res, next) => {
    let userId = res.locals.userId
    User.findAll({
      include: [
        {
          model: Recipe,
          attributes: ['id', 'title', 'introduction', 'category', 'createdAt']
        }
      ],
      where: { id: userId }
    })
      .then(async (info) => {
        let Data = await Promise.all(
          info[0].Recipes.map(async (el) => {
            let value = await Recipe.findOne({
              include: [
                { model: TasteScore, attributes: ['score'] },
                { model: EasyScore, attributes: ['score'] }
              ],
              where: { id: el.id }
            })

            let tasteNum = value.TasteScores.length
            let tasteAvg =
              tasteNum === 0 ? 0 : everyScoreSum(value.TasteScores) / tasteNum
            let easyNum = value.EasyScores.length
            let easyAvg =
              easyNum === 0 ? 0 : everyScoreSum(value.EasyScores) / easyNum

            const {
              id,
              title,
              introduction,
              category,
              createdAt,
              mainImg
            } = value

            return {
              id,
              title,
              mainImg,
              introduction,
              category,
              tasteAvg: tasteAvg.toFixed(2),
              easyAvg: easyAvg.toFixed(2),
              createdAt
            }
          })
        )
        if (Data.length === 0) {
          res.status(200).send('작성한 레시피가 없습니다!')
        }
        res.send(Data)
      })
      .catch((err) => {
        console.log('myRecipe posts error!')
        next(err)
      })
  },
  favorite: (req, res, next) => {
    let userId = res.locals.userId
    User.findAll({
      include: [{ model: Favorite, attributes: ['recipeId'] }],
      where: { id: userId }
    })
      .then(async (info) => {
        let Data = await Promise.all(
          info[0].Favorites.map(async (el) => {
            let value = await Recipe.findOne({
              include: [
                { model: TasteScore, attributes: ['score'] },
                { model: EasyScore, attributes: ['score'] }
              ],
              where: { id: el.recipeId }
            })

            let tasteNum = value.TasteScores.length
            let tasteAvg =
              tasteNum === 0 ? 0 : everyScoreSum(value.TasteScores) / tasteNum
            let easyNum = value.EasyScores.length
            let easyAvg =
              easyNum === 0 ? 0 : everyScoreSum(value.EasyScores) / easyNum

            const {
              id,
              title,
              introduction,
              category,
              createdAt,
              updatedAt,
              mainImg
            } = value

            return {
              id,
              title,
              mainImg,
              introduction,
              category,
              tasteAvg: tasteAvg.toFixed(2),
              easyAvg: easyAvg.toFixed(2),
              createdAt,
              updatedAt
            }
          })
        )
        if (Data.length === 0)
          res.status(200).send({ message: '즐겨찾기 레시피가 없습니다!' })
        res.send(Data)
      })
      .catch((err) => {
        console.log('favorite posts error!')
        next(err)
      })
  },
  addFavorite: (req, res, next) => {
    let recipeId = Number(req.params.recipesId)
    let userId = res.locals.userId
    Favorite.findOrCreate({
      where: {
        userId: userId,
        recipeId: recipeId
      }
    })
      .then(([data, created]) => {
        if (!created) {
          res.status(409).send({ message: '이미 등록된 즐겨찾기입니다!' })
        }
        res.status(201).send(data)
      })
      .catch((err) => {
        console.log('Favorite Add Error!')
        next(err)
      })
  },
  deleteFavorite: (req, res, next) => {
    let recipeId = Number(req.params.recipesId)
    let userId = res.locals.userId
    Favorite.destroy({
      where: {
        userId: userId,
        recipeId: recipeId
      }
    })
      .then(() => {
        res.status(200).send({ message: '즐겨찾기가 성공적으로 삭제됐습니다!' })
      })
      .catch((err) => {
        console.log('Favorite Delete Error!')
        next(err)
      })
  }
}
