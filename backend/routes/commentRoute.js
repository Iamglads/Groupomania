const express = require('express')
const router = express.Router() 


// controller comments
const commentsController = require('../controller/commentController')



router.post('/comment', commentsController.createCommentPost)
router.get('/comment', commentsController.getCommentPost)
router.delete('/comment/:id', commentsController.deleteCommentPost) 


module.exports = router