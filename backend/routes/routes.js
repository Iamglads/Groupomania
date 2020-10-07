const express = require('express')
const router = express.Router()

// controller users
const userController = require('../controller/userController')

// controller posts
const postsController = require('../controller/postsController')

// controller posts
const commentsController = require('../controller/commentController')


// routes users
router.post('/user/login', userController.login)
router.post('/user/signup', userController.signup)
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getUserId)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

// routes posts
router.post('/posts', postsController.createPost)
router.get('/posts', postsController.getAllPosts)
router.get('/posts/:id', postsController.getPostId)
router.put('/posts/:id', postsController.updatePost)
router.delete('/posts/:id', postsController.deletePost) 


// routes comments
 router.post('/comment', commentsController.createComment)
router.get('/comments', commentsController.getAllComments)
router.get('/comment/:id', commentsController.getCommentId)
router.put('/comment/:id', commentsController.updateComment)
router.delete('/comment/:id', commentsController.deleteComment)  

// likes



module.exports = router
