const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')
const textRoutes = require('./textRoutes')

router.use('/text', textRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router