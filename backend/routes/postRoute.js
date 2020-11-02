const express = require('express')
const router = express.Router() 

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')

// controller posts
const postsController = require('../controller/postsController')

// routes posts
router.post('/post', auth, multer, postsController.createPost)
router.get('/post', auth, postsController.getAllPosts)
router.get('/post/:id', auth, postsController.getPostId)
router.put('/post/:id', auth, postsController.updatePost)
router.delete('/post/:id', auth, postsController.deletePost) 


module.exports = router