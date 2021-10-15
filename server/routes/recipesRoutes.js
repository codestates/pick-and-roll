const router = require('express').Router()
const recipesController = require('../controllers/recipesController')
const auth = require('../controllers/function/function')

router.post('/', auth.isAuth, recipesController.write)
router.get('/', recipesController.findByQuery)
router.patch('/:recipesId', recipesController.update)
router.delete('/:recipesId', auth.isAuth, recipesController.delete)
router.post('/:recipesId/taste-score', auth.isAuth, recipesController.tasteScore)
router.post('/:recipesId/easy-score', auth.isAuth, recipesController.easyScore)
router.post('/:recipesId/comment', auth.isAuth, recipesController.commentAdd)
router.patch('/:recipesId/comment/:commentId', auth.isAuth, recipesController.commentEdit)
router.delete('/:recipesId/comment/:commentId', auth.isAuth, recipesController.commentDelete)

module.exports = router
