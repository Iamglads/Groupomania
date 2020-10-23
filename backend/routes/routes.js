const express = require('express')
const router = express.Router() 

// middlewares
const verifyEmailExist = require('../middlewares/verifyEmail')
const signup = require('../middlewares/userRegister')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')


// controller users
const userController = require('../controller/userController')

// controller posts
const postsController = require('../controller/postsController')

// controller comments
const commentsController = require('../controller/commentController')


// routes users
router.post('/user/login', userController.login)
router.post('/user/signup',  verifyEmailExist.verifyEmail, userController.signup)
// router.get('/user', userController.getAllUsers) // only admin
router.get('/user/:id', auth, userController.getUserId)
router.put('/user/unique/:id', auth, userController.updateUser)
router.delete('/user/unique/:id', auth, userController.deleteUser)

// routes posts
router.post('/post', auth, multer, postsController.createPost)
router.get('/post', auth, postsController.getAllPosts)
router.get('/post/:id', auth, postsController.getPostId)
router.put('/post/:id', auth, postsController.updatePost)
router.delete('/post/:id', auth, postsController.deletePost) 


router.post('/comment', commentsController.createCommentPost)
router.get('/comment', commentsController.getCommentPost)
router.delete('/comment/:id', commentsController.deleteCommentPost)  

// likes
router.post('/post/:postId/like', )

module.exports = router
