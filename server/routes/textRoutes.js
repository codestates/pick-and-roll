const router = require('express').Router()
const textControllers = require('../controllers/textControllers')

router.post('/', textControllers.text)

module.exports = router