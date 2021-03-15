const express = require('express')
const router = express.Router() 


const auth = require('../middlewares/auth')
const verifyEmailExist = require('../middlewares/verifyEmail')
const multer = require('../middlewares/multer')


// controller users
const userController = require('../controller/userController')


// routes users
router.post('/user/login', userController.login)
router.post('/user/signup',  verifyEmailExist.verifyEmail, userController.signup)
// router.get('/user', userController.getAllUsers) // only admin
router.get('/user/:id', auth, userController.getUserId)
router.put('/user/unique/:id', auth, userController.updateUser)
router.delete('/user/unique/:id', auth, userController.deleteUser)

// add user picture 


router.post('/user/picture', auth, multer, userController.addPicture)



module.exports = router