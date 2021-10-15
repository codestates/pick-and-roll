const router = require('express').Router()
const recipesRoutes = require('./recipesRoutes')
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')
const usersRoutes = require('./usersRoutes')

router.use('/recipes', recipesRoutes)
router.use('/users', usersRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router