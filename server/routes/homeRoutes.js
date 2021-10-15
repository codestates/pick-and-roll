const router = require('express').Router()
const homeController = require('../controllers/homeController')

router.get('/', homeController.main)

module.exports = router