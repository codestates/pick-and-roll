const sequelize = require('sequelize')
const {
  Recipe,
  TasteScore,
  EasyScore,
  Comment,
  User,
  Favorite
} = require('../models')
const { isAuthorized } = require('../controllers/token/tokenController')
const { everyScoreSum, isAuth } = require('../controllers/function/function')

module.exports = {
  write: async (req, res, next) => {
    let userParams = `{
      "title": "${req.body.title}",
      "introduction": "${req.body.introduction}",
      "mainImg": "${req.body.mainImg}",
      "category": "${req.body.category}",
      "requiredTime": "${req.body.requiredTime}",
      "ingredients": "${req.body.ingredients}",
      "content": "${req.body.content}",
      "contentImg": "${req.body.contentImg}",
      "userId": "${res.locals.userId}"        
  }` //res.locals.id 바꿔줘야함

    let postData = JSON.parse(userParams)
    const {
      title,
      introduction,
      mainImg,
      category,
      requiredTime,
      ingredients,
      content,
      contentImg,
      userId
    } = postData

    Recipe.findOrCreate({
      where: {
        title,
        introduction,
        mainImg,
        category,
        requiredTime,
        ingredients,
        content,
        contentImg,
        userId
      }
    })
      .then(async ([data, created]) => {
        if (created) {
          const postId = data.dataValues.id
          res.status(201).send({ id: postId })
        }
      })
      .catch((err) => {
        console.log('Write post Error!')
        next(err)
      })
  },
  findByQuery: async (req, res, next) => {
    try {
      let category = req.query.category
      let division = req.query.division
      let searchName = req.query.searchName
      let pageNum = Number(req.query.offset)
      let offset = 0
      let limit = Number(req.query.limit)
      let recipeNum = Number(req.query.id)
      if (pageNum > 1) offset = limit * (pageNum - 1)
      let result

      //* 메인페이지에서 카테고리별, 분류별 데이터를 담당합니다 *//
      if (category && division && offset !== undefined && limit !== undefined) {
        let categorySort
        //* 최신순 정렬 *//
        if (division === 'createdAt') {
          categorySort = await Recipe.findAll(
            category === 'all'
              ? {
                  offset: Number(offset),
                  limit: Number(limit),
                  include: [
                    { model: TasteScore, attributes: ['score'] },
                    { model: EasyScore, attributes: ['score'] }
                  ],
                  order: ['createdAt']
                }
              : {
                  offset: Number(offset),
                  limit: Number(limit),
                  include: [
                    { model: TasteScore, attributes: ['score'] },
                    { model: EasyScore, attributes: ['score'] }
                  ],
                  order: ['createdAt'],
                  where: { category: category }
                }
          )
          result = await Promise.all(
            categorySort.map(async (el) => {
              let tasteNum = el.TasteScores.length
              let tasteAvg =
                tasteNum === 0 ? 0 : everyScoreSum(el.TasteScores) / tasteNum
              let easyNum = el.EasyScores.length
              let easyAvg =
                easyNum === 0 ? 0 : everyScoreSum(el.EasyScores) / easyNum
              const {
                id,
                userId,
                title,
                mainImg,
                introduction,
                category,
                createdAt,
                updatedAt
              } = el
              //* 레시피 만든 사용자 닉네임 정보 보내기 *//
              let findUserNickName = await User.findOne({
                where: { id: userId }
              })
              let userNickName = findUserNickName.dataValues.nickname
              return {
                id,
                userNickName,
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
        } else if (division === 'taste' || division === 'easy') {
          //* 맛, 편리성 정렬 *//
          categorySort = await Recipe.findAll(
            category === 'all'
              ? {
                  include: [
                    { model: TasteScore, attributes: ['score'] },
                    { model: EasyScore, attributes: ['score'] }
                  ],
                  order: ['createdAt']
                }
              : {
                  include: [
                    { model: TasteScore, attributes: ['score'] },
                    { model: EasyScore, attributes: ['score'] }
                  ],
                  order: ['createdAt'],
                  where: { category: category }
                }
          )
          let avgAdd = await Promise.all(
            categorySort.map(async (el) => {
              let tasteNum = el.TasteScores.length
              let tasteAvg =
                tasteNum === 0 ? 0 : everyScoreSum(el.TasteScores) / tasteNum
              let easyNum = el.EasyScores.length
              let easyAvg =
                easyNum === 0 ? 0 : everyScoreSum(el.EasyScores) / easyNum
              const {
                id,
                userId,
                title,
                mainImg,
                introduction,
                category,
                createdAt,
                updatedAt
              } = el
              let findUserNickName = await User.findOne({
                where: { id: userId }
              })
              let userNickName = findUserNickName.dataValues.nickname
              return {
                id,
                userNickName,
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
          let sortAvg = avgAdd.sort((a, b) => {
            if (division === 'taste') return b.tasteAvg - a.tasteAvg
            else if (division === 'easy') return b.easyAvg - a.easyAvg
          })
          let newArr = []
          for (let n = offset; n < offset + limit; n++) {
            if (sortAvg[n]) newArr.push(sortAvg[n])
          }
          result = newArr
        }
      } else if (searchName && offset !== undefined && limit !== undefined) {
        //* 검색어 정렬 *//
        let searchData = await Recipe.findAll({
          offset: Number(offset),
          limit: Number(limit),
          include: [
            { model: TasteScore, attributes: ['score'] },
            { model: EasyScore, attributes: ['score'] }
          ],
          where: {
            title: {
              [sequelize.Op.like]: '%' + searchName + '%'
            }
          }
        })
        let addAvg = await Promise.all(
          searchData.map(async (el) => {
            let tasteNum = el.TasteScores.length
            let tasteAvg =
              tasteNum === 0 ? 0 : everyScoreSum(el.TasteScores) / tasteNum
            let easyNum = el.EasyScores.length
            let easyAvg =
              easyNum === 0 ? 0 : everyScoreSum(el.EasyScores) / easyNum
            const {
              id,
              userId,
              title,
              mainImg,
              introduction,
              category,
              createdAt,
              updatedAt
            } = el
            let findUserNickName = await User.findOne({
              where: { id: userId }
            })
            let userNickName = findUserNickName.dataValues.nickname
            return {
              id,
              userNickName,
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
        let newArr = []
        for (let n = offset; n < offset + limit; n++) {
          if (addAvg[n]) newArr.push(addAvg[n])
        }
        result = newArr
      } else if (recipeNum) {
        isAuth(req, res)
        //* 레시피 게시물을 클릭 후 보여주는 부분 *//
        let recipeData = await Recipe.findOne({
          include: [
            { model: TasteScore, attributes: ['score'] },
            { model: EasyScore, attributes: ['score'] },
            {
              model: Comment,
              attributes: ['id', 'content', 'createdAt', 'userId']
            }
          ],
          where: { id: recipeNum }
        })
        let tasteNum = recipeData.dataValues.TasteScores.length
        let tasteAvg =
          tasteNum === 0
            ? 0
            : everyScoreSum(recipeData.dataValues.TasteScores) / tasteNum
        let easyNum = recipeData.dataValues.EasyScores.length
        let easyAvg =
          easyNum === 0
            ? 0
            : everyScoreSum(recipeData.dataValues.EasyScores) / easyNum
        let seperateWords = recipeData.dataValues.content.split('@')
        let seperateContentImg = recipeData.dataValues.contentImg.split(',')
        let seperateIngredients1 = recipeData.dataValues.ingredients.split('@')
        let seperateIngredients2 = seperateIngredients1.map((el) => {
          return el.split(',')
        })
        let isMyRecipe = false
        let isMyFavorite = false
        let isVoteEasy = false
        let isVoteTaste = false

        const {
          id,
          userId,
          title,
          introduction,
          category,
          requiredTime,
          createdAt,
          updatedAt,
          mainImg,
          Comments
        } = recipeData

        //* 레시피 만든 사용자 닉네임 정보 보내기 *//
        let findUserNickName = await User.findOne({
          where: { id: res.locals.userId }
        })
        let userNickName = findUserNickName.dataValues.nickname

        //* 나의 게시물, 즐겨찾기인지 확인 *//
        let findFavoriteRecipe = await Favorite.findOne({
          where: {
            userId: res.locals.userId,
            recipeId: id
          }
        })
        let findEasyScore = await EasyScore.findOne({
          where: {
            userId: res.locals.userId,
            recipeId: id
          }
        })
        let findTasteScore = await TasteScore.findOne({
          where: {
            userId: res.locals.userId,
            recipeId: id
          }
        })

        if (!!findEasyScore) isVoteEasy = true
        if (!!findTasteScore) isVoteTaste = true
        if (!!findFavoriteRecipe) isMyFavorite = true
        if (res.locals.userId === userId) isMyRecipe = true

        //* 댓글정보를 불러와서 입력해주는 곳 *//
        let commentData = await Promise.all(
          Comments.map(async (el) => {
            let value = await User.findOne({
              where: { id: el.userId }
            })
            let newObj = { nickname: value.nickname }
            let result = { ...el.dataValues, ...newObj }

            return result
          })
        )

        resultData = {
          id,
          userId,
          userNickName,
          isMyRecipe,
          isMyFavorite,
          isVoteTaste,
          isVoteEasy,
          title,
          introduction,
          category,
          requiredTime,
          content: seperateWords,
          createdAt,
          updatedAt,
          tasteAvg: tasteAvg.toFixed(2),
          easyAvg: easyAvg.toFixed(2),
          mainImg,
          contentImg: seperateContentImg,
          ingredients: seperateIngredients2,
          commentData
        }
        res.locals.message === 'Auth Ok!'
          ? res.send({ recipeData: resultData })
          : res.send({ accessToken: res.locals.isAuth, recipeData: resultData })
      }
      res.send(result)
    } catch (err) {
      console.log('findByQuery Error!')
      next(err)
    }
  },
  update: async (req, res, next) => {
    let userParams = `{
      "title": "${req.body.title}",
      "introduction": "${req.body.introduction}",
      "category": "${req.body.category}",
      "requiredTime": "${req.body.requiredTime}",
      "content": "${req.body.content}",
      "mainImg": "${req.body.mainImg}",
      "contentImg": "${req.body.contentImg}",
      "ingredients": "${req.body.ingredients}"        
  }`
    let recipeData = JSON.parse(userParams)
    let recipeId = req.params.recipesId

    const {
      title,
      introduction,
      category,
      requiredTime,
      content,
      mainImg,
      contentImg,
      ingredients
    } = recipeData

    let updateRecipeData = {
      title,
      introduction,
      mainImg,
      category,
      requiredTime,
      ingredients,
      content,
      contentImg
    }
    Recipe.update(updateRecipeData, {
      where: { id: recipeId }
    })
      .then(async () => {
        let updatedData = await Recipe.findOne({ where: { id: recipeId } })
        let recipeData = updatedData.dataValues
        res.send(recipeData)
      })
      .catch((err) => {
        console.log('mypage update error!')
      })
  },
  delete: (req, res, next) => {
    Recipe.destroy({
      where: { id: req.params.recipesId }
    })
      .then(() => {
        res.send({ message: `레시피 삭제가 완료됐습니다!` })
      })
      .catch((err) => {
        console.log('recipes delete error!')
        next(err)
      })
  },
  tasteScore: (req, res, next) => {
    let recipeId = req.params.recipesId
    let userId = res.locals.userId
    let score = req.body.score

    TasteScore.findOrCreate({
      where: {
        score: score,
        userId: userId,
        recipeId: recipeId
      }
    })
      .then(([data, created]) => {
        if (!created) {
          res.status(409).send({ message: '맛 평점 중복투표는 불가능합니다!' })
        }
        res.send(data.dataValues)
      })
      .catch((err) => {
        console.log('Taste score Add Error!')
        next(err)
      })
  },
  easyScore: (req, res, next) => {
    let recipeId = req.params.recipesId
    let userId = res.locals.userId
    let score = req.body.score

    EasyScore.findOrCreate({
      where: {
        score: score,
        userId: userId,
        recipeId: recipeId
      }
    })
      .then(([data, created]) => {
        if (!created) {
          res
            .status(409)
            .send({ message: '편리성 평점 중복투표는 불가능합니다!' })
        }
        res.send(data.dataValues)
      })
      .catch((err) => {
        console.log('Easy score Add Error!')
        next(err)
      })
  },
  commentAdd: (req, res, next) => {
    let recipeId = req.params.recipesId
    let userId = res.locals.userId
    let content = req.body.content

    Comment.findOrCreate({
      where: {
        content: content,
        userId: userId,
        recipeId: recipeId
      }
    })
      .then(([data, created]) => {
        if (!created) {
          res.status(409).send({ message: '댓글 도배는 금지에요!' })
        }
        res.status(201).send(data.dataValues)
      })
      .catch((err) => {
        console.log('New comment add Error!')
        next(err)
      })
  },
  commentEdit: async (req, res, next) => {
    let commentId = req.params.commentId
    let content = req.body.content
    let userId = res.locals.userId
    let updateComment = {
      content: content
    }
    let findCommentUser = await Comment.findOne({ where: { id: commentId } })
    let commentUserId = findCommentUser.dataValues.userId
    if (commentUserId !== userId) {
      return res.status(403).send({ message: '해당 권한이 없습니다.' })
    }
    Comment.update(updateComment, {
      where: { id: commentId }
    })
      .then(async () => {
        let updateData = await Comment.findOne({ where: { id: commentId } })
        res.send(updateData.dataValues)
      })
      .catch((err) => {
        console.log('Update comment Error!')
        next(err)
      })
  },
  commentDelete: async (req, res, next) => {
    let commentId = req.params.commentId
    let userId = res.locals.userId
    let findCommentUser = await Comment.findOne({ where: { id: commentId } })
    let commentUserId = findCommentUser.dataValues.userId
    if (commentUserId !== userId) {
      return res.status(403).send({ message: '해당 권한이 없습니다.' })
    }
    Comment.destroy({
      where: { id: commentId }
    }).then(() => {
      res.send({ message: '댓글 삭제가 완료됐습니다!' })
    })
  }
}
