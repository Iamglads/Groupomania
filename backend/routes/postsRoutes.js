// route
const express = require('express')
const router = express.router()

const postsController = require('../controller/postsController')

router.post('', postsController.createPost)

router.get('', postsController.getAllPosts)

router.get('', postsController.getUserPosts)

router.update('', postsController.updatePost)

router.delete('', postsController.deletePost)


module.exports = router