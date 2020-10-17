const Comment = require('../models')

exports.createComment = (req, res, next) => {

    models.Post.findOne() 
    .then((userFound) => {
        if(!userFound) {
            return res.status(400).json({ message: "Nous ne pouvons pas identifier le post"})
        } else {
            models.Comment.create({
                comment: req.body.content,
                postId: userFound.id,
            })
            .then(() => res.status(200).json({ message: 'Commentaire publié!'}))
            .catch(error => res.status(400).json(error))
        }
    })
    .catch(error => res.status(500).json(error))
}

exports.getAllComments = (req, res, next) => {
    const order = req.query.order
    
    models.Comment.findAll({
        order: [(order != null ? order.split(':') : ['createdAt', 'DESC'])],
        include:[{ model: models.User, attributes: [ 'firstname', 'lastname']}]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).send(error))
}

exports.getCommentId = (req, res, next) => {
    models.Comment.findById({ id: req.params.id},)
    .then((post) => res.status(200).send(post))
    .catch((error) => res.status(500).send(error))
}


exports.deleteComment = (req, res, next) => {
    models.Comment.destroy({ where: {id: req.params.id}})
        .then(() => res.status(200).send({message: 'Vous avez supprimé une un commentaire!'}))
        .catch((error) => res.status(500).send(error))
}