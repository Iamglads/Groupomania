const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

// routes 

router.post('/', userController.login)
router.post('/signup', userController.signup)

module.exports = router
