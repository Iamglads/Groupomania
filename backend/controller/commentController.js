const models = require('../models')
const jwt = require('jsonwebtoken')

exports.createCommentPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN )
    const userId = decodedToken.userId;

   
    models.Comment.create({
        comment: req.body.comment,
        UserId: userId,
        PostId: 67,
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(400).json(error))
        
    
}

exports.getCommentPost = (req, res, next) => {
    const order = req.query.order
    
    models.Comment.findAll({
        order: [(order != null ? order.split(':') : ['createdAt', 'DESC'])],
        include:[{ model: models.User, attributes: [ 'firstname', 'lastname']}]
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(500).send(error))
}

exports.deleteCommentPost = (req, res, next) => {
    models.Comment.destroy({ where: {id: req.params.id}})
        .then(() => res.status(200).send({message: 'Vous avez supprimé un commentaire!'}))
        .catch((error) => res.status(500).send(error))
}


/* exports.createCommentPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN )
    const userId = decodedToken.userId;

    models.Post.findOne({postId: req.params.id})
    .then((postId) => {
        if(postId.id){
            console.log(postId)
        } else {
            models.Comment.create({ where: {postId: req.body.postId}},{
                comment: req.body.comment,
                userId: userId,
                postId: postId.id,
            })
            .then((comment) => res.status(200).json(comment))
            .catch(error => res.status(400).json(error))
        }
    })
} */